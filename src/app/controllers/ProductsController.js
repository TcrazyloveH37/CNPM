const Product = require('../models/Product');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class ProductsController {
    //[GET] products//create-update-delete
    CRUDProduct(req, res, next) {


        Promise.all([Product.find(), Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('products/create-update-delete', {
                    products: multipleMongooseToObject(products),
                    deletedCount,
                    style: ['products/CRUD.css'],
                    js: ['create-update-delete.js']
                })
            )
            .catch(next);
        // Product.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch((err) => console.log(err));

        // Product.find()
        //     .then(products => {
        //         res.render('products/create-update-delete', {
        //             products: multipleMongooseToObject(products),
        //             style: ['products/CRUD.css'],
        //             js: ['create-update-delete.js']
        //         });
        //     })
        //     .catch(next);
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
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/products/create-update-delete'))
            .catch(next);
    }

    //[patch] /products/:id
    deleteProduct(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('/products/create-update-delete'))
            .catch(next);
    }

    //[GET] /products/:slug
    showProduct(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('products/detail', {
                    product: mongooseToObject(product),
                    style: ['products/detailProduct.css'],
                    js:['detailProduct.js']
                });
            })
            .catch(next);
    }

}

module.exports = new ProductsController();