const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const postsController = require('../controllers/posts-controller');

router.get('/:pid', postsController.getPostById);

router.get('/', postsController.getAllPosts);

router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('date').not().isEmpty(),
        check('time').matches('^([0-2][0-9]):[0-5][0-9]$'),
        check('creator').not().isEmpty(),
        check('likes').isNumeric()
    ],
    postsController.createPost);

router.patch('/:pid', postsController.editPost);

router.delete('/:pid', postsController.deletePost);

module.exports = router;