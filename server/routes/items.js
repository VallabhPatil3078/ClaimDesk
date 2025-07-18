const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const { addItem, getAllItems, getMyItems, deleteItem, updateItem } = require('../controllers/itemController');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, addItem);
router.get('/', getAllItems);
router.get('/my', protect, getMyItems);
router.delete('/:id', protect, deleteItem)
router.put('/:id', protect, updateItem);

module.exports = router;
