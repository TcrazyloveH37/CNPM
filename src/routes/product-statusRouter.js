const express = require('express');
const router = express.Router();

const productStatusController = require('../app/controllers/ProductStatusController');
const { requireAuthUser } = require('../app/middleware/authMiddleware');

// router.get('/', orderController.index);
router.get('/:id', requireAuthUser, productStatusController.index);

module.exports = router;