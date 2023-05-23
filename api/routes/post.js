const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const postController = require('../controllers/post');

router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPost);
router.post('/create', uploadMiddleware.single('file'), postController.createPost);
router.put('/edit', uploadMiddleware.single('file'), postController.editPost);
router.delete('/delete/:postId', postController.deletePost);

module.exports = router;
