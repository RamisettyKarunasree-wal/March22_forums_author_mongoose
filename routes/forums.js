const express = require('express');
const forumsController = require('../controllers/forums');
const router = express.Router();
router.get('/', forumsController.getForums);
router.post('/', forumsController.postForums);
router.delete('/:id', forumsController.deleteForums);
router.put('/:id', forumsController.updateForums);
module.exports = router;
