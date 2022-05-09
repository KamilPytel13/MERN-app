const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts-controller');

router.get('/:pid', postsController.getPostById);

router.get('/', postsController.getAllPosts);

router.post('/', postsController.createPost);

router.patch('/:pid', postsController.editPost);

router.delete('/:pid', postsController.deletePost);

module.exports = router;