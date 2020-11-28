const { multipleMongooseToObject } = require('../../util/mongoose');

class OrderController {
    // [get], /order

    index(req, res, next) {
        res.render('order', { style: ['order.css'], js: ['order.js'] });
    }

}

module.exports = new OrderController();
