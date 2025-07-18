const cloudinary = require('cloudinary').v2;
const Item = require('../models/Items');

// POST /api/items - Add new item
exports.addItem = async (req, res) => {
  const { title, description, location, status } = req.body;
  let imageUrl = null;

  try {
    if (req.file) {
      // Upload image buffer to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'lostfound' }, // optional: put images in a folder
        (error, result) => {
          if (error) throw error;
          imageUrl = result.secure_url; // get image URL
        }
      );

      // This won't work because upload_stream uses callback — need to wrap in promise
    }

    // Because upload_stream uses callback, we need to promisify it:

    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'lostfound' },
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

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.deleteOne(); // or item.remove()

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err); // 👈 log actual error
    res.status(500).json({ message: 'Failed to delete item', error: err.message });
  }
};

// Update item info
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, status, imageUrl } = req.body;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Only allow item owner or admin to update
    if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    item.title = title || item.title;
    item.description = description || item.description;
    item.location = location || item.location;
    item.status = status || item.status;
    item.imageUrl = imageUrl || item.imageUrl;

    const updatedItem = await item.save();
    res.json(updatedItem);

  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err.message });
  }
};

