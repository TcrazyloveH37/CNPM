const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

//router.use('/:slug', homeController.show);
router.get('/', cartController.index);

module.exports = router;
