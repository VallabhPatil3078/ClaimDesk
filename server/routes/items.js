const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { addItem, getAllItems, getMyItems, deleteItem, updateItem } = require('../controllers/itemController');
const Item = require('../models/Items'); // Make sure the file name matches

// Add
router.post('/', protect, upload.single('photo'), addItem);

// Get all
router.get('/', getAllItems);

// Get user's items
router.get('/my', protect, getMyItems);

// Get single item
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

// Update
router.put('/:id', protect, upload.single('photo'), updateItem);

// Delete
router.delete('/:id', protect, deleteItem);

module.exports = router;
