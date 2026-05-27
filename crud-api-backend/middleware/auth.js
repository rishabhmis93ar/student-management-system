const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const auth = (req, res, next) => {
    try {
        const bearerHeader =req.headers['authorization'];
        if(typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            console.log(user);
            req.token = user;
            next();
        } else {
            return res.status(401).json({message: 'No token provided'});
        }
    } catch(err) {
        return res.status(403).json({message: 'Invalid or Expired token'});
    }
}

module.exports = auth;