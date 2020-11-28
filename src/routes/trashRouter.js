const express = require('express');
const router = express.Router();

const trashController = require('../app/controllers/TrashController');
const { requireAuthAdmin } = require('../app/middleware/authMiddleware');

router.get('/',requireAuthAdmin, trashController.trashProduct);

router.put('/:id', requireAuthAdmin, trashController.restoreProduct);
router.delete('/:id', requireAuthAdmin, trashController.destroyProduct);

module.exports = router;
