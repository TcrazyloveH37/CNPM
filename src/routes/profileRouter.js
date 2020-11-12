const express = require('express');
const router = express.Router();

const profileController = require('../app/controllers/ProfileController');

// router.get('/stored', profileController.storedProfile);

router.get('/id', profileController.index);

module.exports = router;