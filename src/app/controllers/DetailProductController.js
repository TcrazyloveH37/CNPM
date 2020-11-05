const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../util/mongoose');


class DetailProductController {
  // [get], /detailProduct
  index(req, res) {
    res.render('detailProduct');
  }

  //[GET] detailProduct/:slug
  showProduct(req,res, next){
    console.log(req.params.slug);
    Product.findOne({ slug: req.params.slug})
      .then(product => {
        res.render('detailProduct/showProduct');
      })
      .catch(next => {
        console.log("err");
      });
  }

}

module.exports = new DetailProductController();
