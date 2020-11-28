const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductStatusController {
    // [get], /product-status

    index(req, res, next) {
        res.render('product-status', { style: ['product-status.css'], js: ['product-status.js'] });
    }

}

module.exports = new ProductStatusController();
