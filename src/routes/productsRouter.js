const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');


router.get('/create-update-delete', productsController.CRUDProduct);
router.post('/store', productsController.storeProduct);
router.get('/edit/:id', productsController.editProduct);
router.put('/:id', productsController.updateProduct);
router.get('/:slug', productsController.showProduct);

module.exports = router;
