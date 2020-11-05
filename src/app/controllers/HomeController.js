const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../util/mongoose');

class HomeController {
  // [get], /
  index(req, res, next) {
    Product.find({})
      .then(products => {
        res.render('home', { products: multipleMongooseToObject(products) });
      })
      .catch(next);
  }
}

module.exports = new HomeController();
