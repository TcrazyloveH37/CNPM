const { multipleMongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

class AddToCartController {
    // [post], /logout

    addToCart(req, res, next) {
        let cart = req.cookies.cart;
        if (cart === undefined)
            cart = [req.params.slug];
        else {
            cart = JSON.parse(req.cookies.cart);
            if (cart.some(c => c === req.params.slug) === false)
                cart.push(req.params.slug);
        }

        const arr = JSON.stringify(cart);
        console.log(arr);
        //check user
        const token = req.cookies.jwt;
        console.log(token);
        if (token) {
            jwt.verify(token, 'key of user', async (err, decodedToken) => {
                if (err) {
                    jwt.verify(token, 'key of admin', async (err2, decodedToken2) => {
                        if (err2) {
                            res.cookie('cart', arr);
                            next();
                        } else {
                            let user = await User.findById(decodedToken2.id);

                            if (user.cart.some(c => c[req.params.slug] !== undefined) === false){
                                let obj = {};
                                obj[req.params.slug] = 1;
                                user.cart.push(obj);
                            }

                            await User.updateOne({ _id: user._id }, { cart: user.cart });
                            next();
                        }
                    });
                } else {
                    let user = await User.findById(decodedToken.id);
                    if (user.cart.some(c => c[req.params.slug] !== undefined) === false) {
                        let obj = {};
                        obj[req.params.slug] = 1;
                        user.cart.push(obj);
                    }

                    await User.updateOne({ _id: user._id }, { cart: user.cart });
                    next();
                }
            });
        } else {

            res.cookie('cart', arr);

            next();
        }

        res.redirect('/');

    }
}
module.exports = new AddToCartController();
