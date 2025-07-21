const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { addItem, getAllItems, getMyItems, deleteItem, updateItem } = require('../controllers/itemController');
const Item = require('../models/Items');

// Add new item
router.post('/', protect, upload.single('photo'), addItem);

// Get all items
router.get('/', getAllItems);

// Get logged-in user's items
router.get('/my', protect, getMyItems);

// Get single item by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch item' });
  }
});

// Update item details
router.put('/:id', protect, upload.single('photo'), updateItem);

// Update status (Pending → Returned)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Allow only owners or admins
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update status' });
    }

    if (item.status !== 'returned') {
      item.status = 'returned';
      await item.save();
      return res.json({ message: 'Status updated successfully', status: item.status });
    }

    res.status(400).json({ message: 'Item is already returned' });
  } catch (err) {
    console.error('Status Update Error:', err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// Delete item
router.delete('/:id', protect, deleteItem);

module.exports = router;
