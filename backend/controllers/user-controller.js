const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-errors');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Jelen',
        surname: 'z Lasu',
        email: 'jelen@gmail.com',
        apartment: 2,
        password: 'haslo'
        //mobile: '074653527483'
    }
];

const getUserById = (req, res, next) => {
    const userId = req.params.uid;

    const user = DUMMY_USERS.find(u => {
        return u.id === userId;
    });

    if(!user) {
        throw new HttpError('User with given id does not exist', 404);
    } 

    res.json({user});
};

const getAllUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS});
}

const registerUser = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs', 422);
    }

    const { name, surname, email, password, apartment } = req.body;

    const userExists = DUMMY_USERS.find(u => u.email === email);
    
    if(userExists) {
        throw new HttpError('User alredy exists', 422);
    };

    const createdUser = {
        id: uuidv4(),
        name,
        surname,
        email,
        password,
        apartment
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({ user: createdUser });
};

const loginUser = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUsed = DUMMY_USERS.find(u => u.email === email);

    if(!identifiedUsed || identifiedUsed.password !== password) {
        throw new HttpError('Wrong username or password', 401);
    };

    res.json({ message: 'Logged in'});
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;