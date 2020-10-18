const Product = require('../models/Product');

class HomeController {
  // [get], /home
  index(req, res) {
    res.render('home');
  }

  // [GET] /home/:slug
  show(req, res) {
    Product.find({}, (err, products) => {
      if (!err) res.json(products);
      else {
        res.status(400).json({ error: 'message' });
      }
    });
  }
}

module.exports = new HomeController();
