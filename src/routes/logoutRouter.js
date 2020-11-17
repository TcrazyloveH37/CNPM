const express = require('express');
const router = express.Router();

const logoutController = require('../app/controllers/LogoutController');

// router.get('/', LoginController.index);
router.get('/', logoutController.index);

module.exports = router;