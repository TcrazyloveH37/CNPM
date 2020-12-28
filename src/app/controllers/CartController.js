const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CartController {
    // [get], /cart

    index(req, res, next) {
        Product.find()
        .then(products =>{
            res.render('cart', { products: multipleMongooseToObject(products), style: ['cart.css'], js: ['cart.js'] });
        })
        .catch(next);
        
    }

}

module.exports = new CartController();


