const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const postsController = require('../controllers/posts-controller');
const checkAuth = require('../middleware/auth');

router.get('/:pid', postsController.getPostById);

router.get('/', postsController.getAllPosts);

//middleware to protect the following routes
router.use(checkAuth);

router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('creator').not().isEmpty(),
    ],
    postsController.createPost);

router.patch('/:pid', postsController.editPost);

router.delete('/:pid', postsController.deletePost);

module.exports = router;