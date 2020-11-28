const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');
const { checkLoginSignup } = require('../app/middleware/authMiddleware');

// router.get('/', LoginController.index);
router.get('/', checkLoginSignup, loginController.index);
router.post('/', loginController.post);

module.exports = router;