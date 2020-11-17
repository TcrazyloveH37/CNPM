const express = require('express');
const router = express.Router();

const signupController = require('../app/controllers/SignupController');

// router.get('/', SignupController.index);
router.get('/', signupController.index);
router.post('/', signupController.post);

module.exports = router;
