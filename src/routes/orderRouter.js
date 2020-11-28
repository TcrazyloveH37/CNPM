const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');
const { requireAuthAdmin } = require('../app/middleware/authMiddleware');

// router.get('/', orderController.index);
router.get('/', requireAuthAdmin, orderController.index);

module.exports = router;