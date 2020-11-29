const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email!!') {
    errors.email = "that email is't registered";
    return errors;
  }

  // incorrect pass
  if (err.message === 'incorrect password!!') {
    errors.password = "that password is't match";
    return errors;
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, admin) => {
  if (admin) {
    return jwt.sign({ id }, 'key of admin', {
      expiresIn: maxAge,
    });
  }
  return jwt.sign({ id }, 'key of user', {
    expiresIn: maxAge,
  });
};

class SignupController {
  // [get], /signup

  index(req, res, next) {
    res.render('signup', { style: ['signup-login.css'], js: ['signup.js'] });
  }

  // [post], /signup
  post = async (req, res) => {
    const { email, password, name } = req.body;

    try {
      const user = await User.create({ email, password, name });
      const token = createToken(user._id, false);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
      res.status(201).json({ user: user._id });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  };
}

module.exports = new SignupController();
