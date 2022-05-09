const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/:uid', userController.getUserById);

module.exports = router;