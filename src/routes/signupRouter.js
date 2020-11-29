const express = require('express');
const router = express.Router();
const { checkLoginSignup } = require('../app/middleware/authMiddleware');

const signupController = require('../app/controllers/SignupController');

// router.get('/', SignupController.index);
router.get('/', checkLoginSignup, signupController.index);
router.post('/', signupController.post);

module.exports = router;
