// server/routes/items.js

const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { addItem, getAllItems, getMyItems, deleteItem, updateItem } = require('../controllers/itemController');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect , upload.single('photo'), addItem);
router.get('/', getAllItems);
router.get('/my', protect, getMyItems);
router.delete('/:id', protect, deleteItem)
router.put('/:id', protect, updateItem);

module.exports = router;
