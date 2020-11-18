const express = require('express');
const router = express.Router();

const trashController = require('../app/controllers/TrashController');

router.get('/', trashController.trashProduct);

router.put('/:id', trashController.restoreProduct);
router.delete('/:id', trashController.destroyProduct);

module.exports = router;
