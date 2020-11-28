const express = require('express');
const router = express.Router();
const { requireAuth } = require('../app/middleware/authMiddleware');

const profileController = require('../app/controllers/ProfileController');


// [get] profile/:id
router.get('/:id', profileController.index);

// [patch]/:id
router.patch('/:id', profileController.updateProfile);

module.exports = router;