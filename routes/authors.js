const express = require('express');
const authorsController = require('../controllers/authors');
const router = express.Router();
router.get('/', authorsController.getAuthors);
router.post('/', authorsController.postAuthors);
router.delete('/:id', authorsController.deleteAuthors);
module.exports = router;
