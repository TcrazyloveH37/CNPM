const Product = require('../models/Product');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class TrashController {

    //[put] /trash/:id
    restoreProduct(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('/trash'))
            .catch(next);
    }


    //[delete] /trash/:id
    destroyProduct(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/trash'))
            .catch(next);
    }


    //[GET] /trash
    trashProduct(req, res, next) {
        Product.findDeleted({ deleted: true })
            .then(products => {
                res.render('trash', {
                    products: multipleMongooseToObject(products),
                    style: ['trash.css'],
                    js: ['trash.js']
                });
            })
            .catch(next);
    }
}

module.exports = new TrashController();