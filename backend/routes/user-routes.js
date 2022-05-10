const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/:uid', userController.getUserById);

router.get('/', userController.getAllUsers);

router.post('/register', 
    [
        check('name').not().isEmpty(),
        check('surname').not().isEmpty(),
        check('email').isEmail(),
        check('password').not().isEmpty(),
        check('apartment').isFloat({ min: 1, max: 999})
    ], 
    userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;