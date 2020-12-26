const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

// router.get('/', LoginController.index);
router.get('/', cartController.index);

module.exports = router;