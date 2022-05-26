const { validationResult } = require('express-validator');
const HttpError = require('../models/http-errors');
const User = require('../models/user');

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;

    let user;

    try {
        user = await User.findById(userId);
    } catch(err) {
        const error = new HttpError(
            'Could not fetch the user',
            500
        );
        return next(error);
    }

    if(!user) {
        return next(
            new HttpError('User with given id does not exist', 404)
        );
    } 

    res.json({ user: user.toObject( {getters: true }) });
};

const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, '-password');
    } catch(err) {
        const error = new HttpError(
            'Fetching users failed. Try again later.',
            500
        );
        return next(error);
    }

    res.json({ users: users.map(user => user.toObject( {getters: true }))});
};

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs', 422)
        );
    }

    const { name, surname, email, password, apartment } = req.body;

    let userExists;

    try {
        userExists = await User.findOne({ email: email });
    } catch(err) {
        const error = new HttpError(
            'Registration failed. Try again later.',
            500
        );
        return next(error);
    }

    if(userExists) {
        const error = new HttpError(
            'User already exists. Try to log in.',
            422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        surname,
        email,
        password,
        apartment,
        posts: [],
        events: []
    });

    try {
        await createdUser.save();
    } catch(err) {
        const error = new HttpError(
            'Creating user failed. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let userExists;

    try {
        userExists = await User.findOne({ email: email });
    } catch(err) {
        const error = new HttpError(
            'Logging in failed. Try again later.',
            500
        );
        return next(error);
    }

    if(!userExists || userExists.password !== password) {
        const error = new HttpError(
            'Wrong username or password. Try again.',
            401
        );
        return next(error);
    }

    res.json({ message: 'Logged in'});
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;