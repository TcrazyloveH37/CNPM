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

  //[GET] /:slug
  showProduct(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then(product => {
        res.render('showProduct');
      })
      .catch(next => {
        console.log("err");
      });
  }
}

module.exports = new HomeController();
