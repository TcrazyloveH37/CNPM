const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

// router.get('/', LoginController.index);
router.get('/', loginController.index);
router.post('/', loginController.post);

module.exports = router;