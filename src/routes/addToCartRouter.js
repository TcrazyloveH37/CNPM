const express = require('express');
const router = express.Router();

const addToCartController = require('../app/controllers/AddToCartController');
// const {
//     requireAuth,
//     requireAuthAdmin,
// } = require('../app/middleware/authMiddleware');


router.post('/:slug', addToCartController.addToCart);



module.exports = router;
