const Product = require('../models/Product');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class ProductsController {
    //[GET] products//create-update-delete
    CRUDProduct(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('products/create-update-delete', { 
                    products: multipleMongooseToObject(products),
                    style: ['CRUD.css']
                });
            })
            .catch(next);
    }

    //[POST] /products/store
    storeProduct(req, res, next) {

        const product = new Product(req.body);

        product.save()
            .then(() => res.redirect('/products/create-update-delete'))
        .catch(err => {
            
        });
    }

    //[get] /products/edit/:id
    editProduct(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render('products/edit', {
                product: mongooseToObject(product)
            }))
            .catch(next);
    }

    //[put] /products/:id
    updateProduct(req, res, next) {
        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/products/create-update-delete'))
            .catch(next);
    }

    //[delete] /products/delete/:id
    deleteProduct(req, res, next) {
        Product.deleteOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/products/create-update-delete'))
            .catch(next);
    }

    //[GET] /products/:slug
    showProduct(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('products/detail', {
                    product: mongooseToObject(product),
                    style: ['detailProduct.css']
                });
            })
            .catch(next);
    }
}

module.exports = new ProductsController();