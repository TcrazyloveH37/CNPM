const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductsController {
    //[GET] /products/create
    createProduct(req, res, next) {
        res.render('products/create');
    }

    //[POST] /products/store
    storeProduct(req, res, next) {

        const product = new Product(req.body);

        product.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            
        });
    }

    //[GET] /products/:slug
    showProduct(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.send('chi tiet san pham');
            })
            .catch(next => {
                console.log("err");
            });
    }
}

module.exports = new ProductsController();