const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');
const { requireAuth } = require('../app/middleware/authMiddleware');


router.get('/create-update-delete', productsController.CRUDProduct);
router.post('/store',productsController.storeProduct);


router.get('/:slug', productsController.showProduct);

router.put('/:id', productsController.updateProduct);

router.patch('/:id', productsController.deleteProduct);

module.exports = router;
