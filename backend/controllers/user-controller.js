const HttpError = require('../models/http-errors');

let DUMMY_USER = [
    {
        id: 'u1',
        name: 'Jelen',
        surname: 'z Lasu',
        email: 'jelen@gmail.com',
        apartment: 2,
        password: 'haslo',
        mobile: '074653527483'
    }
];

const getUserById = (req, res, next) => {
    const userId = req.params.uid;

    const user = DUMMY_USER.find(u => {
        return u.id === userId;
    });

    if(!user) {
        throw new HttpError('User with given id does not exist', 404);
    } 

    res.json({user});
}

exports.getUserById = getUserById;