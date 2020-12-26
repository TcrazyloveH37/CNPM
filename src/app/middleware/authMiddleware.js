const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');
const { multipleMongooseToObject } = require('../../util/mongoose');

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'key of user', (err, decodedToken) => {
      if (err) {
        jwt.verify(token, 'key of admin', (err2, decodedToken2) => {
          if (err2) {
            console.log(decodedToken2);
            res.redirect('/404');
          } else {
            next();
          }


    const token = req.cookies.jwt
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'key of user', (err, decodedToken) => {
            if (err) {
                jwt.verify(token, 'key of admin', (err2, decodedToken2) => {
                    if (err2) {
                        console.log(decodedToken2);
                        res.redirect('/404');

                    } else {
                        next();
                    }
                });
            } else {
                next();
            }

        });
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

//  Checking the Current User
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'key of user', async (err, decodedToken) => {
      if (err) {
        jwt.verify(token, 'key of admin', async (err2, decodedToken2) => {
          if (err2) {
            console.log(err2);
            res.locals.user = null;
            next();
          } else {
            let user = await User.findById(decodedToken2.id);
            // let temp = Object.create(user);
            // temp.name = temp.name.substr(temp.name.lastIndexOf(" "));
            res.locals.user = user.toObject();
            next();
          }
        });
      } else {
        let user = await User.findById(decodedToken.id);
        // let temp = Object.create(user);
        // temp.name = temp.name.substr(temp.name.lastIndexOf(" "));
        res.locals.user = user.toObject();
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkLoginSignup = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    res.redirect('/');
  } else {
    next();
  }
};

const requireAuthAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'key of admin', (err2, decodedToken2) => {
      if (err2) {
        console.log(decodedToken2);
        res.redirect('/404');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/404');
  }
};

const requireAuthUser = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'key of user', (err2, decodedToken) => {
      if (err2) {
        console.log(decodedToken);
        res.redirect('/404');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/404');
  }
};


module.exports = {
  requireAuth,
  checkUser,
  checkLoginSignup,
  requireAuthAdmin,
  requireAuthUser,
};


const checkLoginSignup = (req, res, next) => {

    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        res.redirect('/');
    }
    else {
        next();
    }
}

const requireAuthAdmin = (req, res, next) => {

    const token = req.cookies.jwt
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'key of user', (err, decodedToken) => {
            if (err) {
                jwt.verify(token, 'key of admin', (err2, decodedToken2) => {
                    if (err2) {
                        console.log(decodedToken2);
                        res.redirect('/404');

                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        });
    }
    else {
        res.redirect('/404');
    }
}


module.exports = { requireAuth, checkUser, checkLoginSignup, requireAuthAdmin };

