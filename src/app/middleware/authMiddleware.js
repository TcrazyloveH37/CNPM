const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'key of huy', (err, decodedToken) => {
            if (err) {
                jwt.verify(token, 'key of admin', (err, decodedToken) => {
                    if (err) {
                        res.redirect('/login');

                    } else {
                        console.log(decodedToken);
                        next();
                    }
                });
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
        jwt.verify(token, 'key of user', async (err, decodedToken) => {
            if (err) {
                jwt.verify(token, 'key of admin', async (err2, decodedToken2) => {
                    if (err2) {
                        console.log(err2);
                        res.locals.user = null;
                        next();
                    }
                    else {
                        let user = await User.findById(decodedToken2.id);
                        let temp = Object.create(user);
                        temp.name = temp.name.substr(temp.name.lastIndexOf(" "));
                        res.locals.user = temp.toObject();
                        next();
                        console.log('admin');
                    }
                });
            }
            else {
                console.log('user');
                let user = await User.findById(decodedToken.id);
                let temp = Object.create(user);
                temp.name = temp.name.substr(temp.name.lastIndexOf(" "));
                res.locals.user = temp.toObject();
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