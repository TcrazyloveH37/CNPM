const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');


router.get('/create', productsController.createProduct);
router.post('/store', productsController.storeProduct);
//router.use('/:slug', productsController.show);
router.get('/:slug', productsController.showProduct);
//router.get('/', productsController.index);

module.exports = router;
