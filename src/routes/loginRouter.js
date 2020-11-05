const express = require('express');
const router = express.Router();

const LoginController = require('../app/controllers/LoginController');

//router.use('/:slug', homeController.show);
router.get('/', LoginController.index);

module.exports = router;
