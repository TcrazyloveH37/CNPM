const Users = require('../models/User');
const Products = require('../models/Product');
const { multipleMongooseToObject } = require('../../util/mongoose');
class ProductStatusController {
  // [get], /product-status

  index = async (req, res, next) => {
    // Users.findOne({_id: req.params.id})
    // .then(User =>{
    //     var myCart = [];

    //     User.cart.forEach(c => {
    //         Products.find({slug: Object.keys(c)[0]})
    //         .then(Product => {
    //             myCart.push(Product);
    //         })
    //         .catch(next);
    //     });
    //     console.log(myCart);
    //     res.render('product-status', { Products: myCart, style: ['product-status.css'], js: ['product-status.js'] });
    // })
    // .catch(next);

    let user = await Users.findOne({ _id: req.params.id });
    var myCart = [];

    for (let i = 0; i < user.cart.length; i++) {
      let sanpham = await Products.findOne({
        slug: Object.keys(user.cart[i])[0],
      });
      myCart.push(sanpham);
    }
    console.log(myCart);
    res.render('product-status', {
      products: multipleMongooseToObject(myCart),
      style: ['product-status.css'],
      js: ['product-status.js'],
    });
  };
}

module.exports = new ProductStatusController();
