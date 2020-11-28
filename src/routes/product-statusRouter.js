const express = require('express');
const router = express.Router();

const productStatusController = require('../app/controllers/ProductStatusController');

// router.get('/', orderController.index);
router.get('/:id', productStatusController.index);

module.exports = router;