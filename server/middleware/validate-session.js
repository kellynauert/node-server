const jwt = require('jsonwebtoken');
const router = require('../controllers/journalcontroller');
const journal = require('../models/journal');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token -->', token);

    if (!token) {
        return res.status(403).json({ auth: false, message: "No token provided" })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => { //verify() decodes token, jwt.verify(token, secretOrPublicKey, [options, callback])
            console.log('decodeToken -->', decodeToken);
            if (!err && decodeToken) { 
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                    .then(user => {
                        console.log('user -->', user);
                        if (!user) throw err;
                        console.log('req -->', req)
                        req.user = user;
                        return next(); //next() is a middleware func that exits function
                    })
                    .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).json('Not Authorized')
            }
        });
    }
};


module.exports = validateSession;