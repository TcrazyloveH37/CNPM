const express = require('express');
const router = express.Router();

const signUpController = require('../app/controllers/SignUpController');

//router.use('/:slug', homeController.show);
router.get('/', signUpController.index);

module.exports = router;
