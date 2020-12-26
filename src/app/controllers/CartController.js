const { multipleMongooseToObject } = require('../../util/mongoose');

class CartController {
    // [get], /cart

    index(req, res, next) {
        res.render('cart', { style: ['cart.css'], js: ['cart.js'] });
    }

}

module.exports = new CartController();
