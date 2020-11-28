const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

// router.get('/', orderController.index);
router.get('/:id', orderController.index);

module.exports = router;