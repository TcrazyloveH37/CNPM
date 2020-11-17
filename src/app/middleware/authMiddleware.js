const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'key of huy', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}

//  Checking the Current User
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt


    if (token) {
        jwt.verify(token, 'key of huy', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                next();
            }
            else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user.toObject();
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };