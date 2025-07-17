const Item = require('../models/Items');

// POST /api/items - Add new item
exports.addItem = async (req, res) => {
  const { title, description, location, status, imageUrl } = req.body;

  try {
    const item = new Item({
      title,
      description,
      location,
      status,
      imageUrl,
      user: req.user.id  // Set by JWT middleware
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
    const items = await Item.find().populate('user', 'name email');
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

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.deleteOne(); // or item.remove()

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err); // 👈 log actual error
    res.status(500).json({ message: 'Failed to delete item', error: err.message });
  }
};
