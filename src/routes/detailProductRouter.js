const express = require('express');
const router = express.Router();

const detailProductController = require('../app/controllers/DetailProductController');

//router.use('/:slug', homeController.show);
router.get('/', detailProductController.index);

module.exports = router;
