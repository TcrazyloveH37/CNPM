const Product = require('../models/Product');

class HomeController {
  // [get], /
  index(req, res, next) {
    Product.find({})
      .then(products => {

        products = products.map(product => product.toObject());

        res.render('home', { products });
      })
      .catch(next);
  }
}

module.exports = new HomeController();
