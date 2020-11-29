const express = require('express');
const router = express.Router();

const _404Controller = require('../app/controllers/404Controller');

// router.get('/:slug', homeController.show);
router.get('/', _404Controller.index);

module.exports = router;
