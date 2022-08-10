const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-errors');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            throw new HttpError('Authentication failed');
        }
        const decodedToken = jwt.verify(token, "secretKey_notToBeShared");
        req.userData = {userId: decodedToken.userId}
        next();
    } catch(err) {
        const error = new HttpError('Authentication failed', 401);
        return next(error)
    }
    
    
}