const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', postController.findAll);
router.get('/:id', postController.findOne);

router.post('/', authMiddleware, postController.create);
router.put('/:id', authMiddleware, postController.update);
router.delete('/:id', authMiddleware, postController.delete);

module.exports = router; 
