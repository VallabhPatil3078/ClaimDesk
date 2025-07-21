// server/controllers/itemController.js

const cloudinary = require('cloudinary').v2;
const Item = require('../models/Items');

// POST /api/items - Add new item
exports.addItem = async (req, res) => {
  const { title, description, location, status } = req.body;
  let imageUrl = null;

  try {
    // ✅ Only use the correct, promisified Cloudinary upload
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'lostfound', timeout: 20000 }, // optional: add timeout
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    const item = new Item({
      title,
      description,
      location,
      status,
      imageUrl,
      user: req.user.id,
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Add Item Error:', err); // helpful for debugging
    res.status(500).json({ message: 'Failed to add item', error: err.message });
  }
};

// GET /api/items - Public
exports.getAllItems = async (req, res) => {
  try {
    const { status, location, date } = req.query;
    const query = {};

    if (status) query.status = status; // 'lost' or 'found'
    if (location) query.location = location;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: start, $lte: end };
    }

    const items = await Item.find(query).populate('user', 'name email');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

// GET /api/items/my - Logged-in user's items
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your items' });
  }
};

// DELETE /api/items/:id - Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.user.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }


    await item.deleteOne();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Failed to delete item', error: err.message });
  }
};


exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, status } = req.body;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Ownership check
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    // Update fields
    item.title = title || item.title;
    item.description = description || item.description;
    item.location = location || item.location;
    item.status = status || item.status;

    // Handle image upload if new photo provided
    if (req.file) {
      const upload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'lostfound' },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(req.file.buffer);
      });
      item.imageUrl = upload.secure_url;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err.message });
  }
};


