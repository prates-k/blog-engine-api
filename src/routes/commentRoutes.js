const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', commentController.create);
router.post('/:id', commentController.delete);

module.exports = router;