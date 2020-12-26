const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');
const {
  requireAuth,
  requireAuthAdmin,
} = require('../app/middleware/authMiddleware');

router.get(
  '/create-update-delete',
  requireAuthAdmin,
  productsController.CRUDProduct,
);
router.post('/store', requireAuthAdmin, productsController.storeProduct);

router.get('/:slug', productsController.showProduct);

router.put('/:id', requireAuthAdmin, productsController.updateProduct);

router.patch('/:id', requireAuthAdmin, productsController.deleteProduct);

module.exports = router;
