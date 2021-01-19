const router = require('express').Router(); //imports and requires express and stores in a variable. Router() returns a router object
const User = require('../db').import('../models/user'); // imports and requires user model through db.js and stores in a variable
const jwt = require("jsonwebtoken") //requires jsonwebtoken and stores in a variable
const bcrypt = require('bcryptjs'); //imports and requires bcryptjs and stores in a variable
module.exports = router; //exports module for use outside the file

router.post('/create', function (req, res) { //call post() method which lets us create an HTTP POST request. First argument is path, second is callback/handler function
    User.create({ //access model from users.js, create() is a sequelize method that creates an instance of the User model and sends to the db if data types match
        email: req.body.user.email, //req.body is Express middleware that appends two props. Req is the request,  user is prop of body, body is where data is held, email is prop of user
        password: bcrypt.hashSync(req.body.user.password, 13) //locates the password in the response and passes it into the hashSync() method, which hashes the first argument and then salts it X times equal to second argument
    })
    .then( //if promise is successfully returned, fires a function that send a success message and user information
        function createSuccess(user) { //when create() returns promise, createSuccess function is called and passes in user
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }); //calls jwt from installed dependency, sign() creates token. First param is payload/data we're sending,  user.id is primary key of user table, user refers to param in createSuccess func, which is our response we new user is created. Second param is signature, which helps encode/decode token, pulls from .env file for JWT_SECRET. Expiration sets when token will expire, ss*mm*hh
            res.json({ //packages response as JSON 
                user: user, //create user object in our response and sets value to be the user parameter. 1st param is object name, second is param from createSuccess(). Sends back in response
                message: 'User successfully created!', //attaches success method to response object
                sessionToken: token //passes value of token to response object
            });
        }
    )
    .catch(err => res.status(500).json({error: err})) //if promise is not successfully returned, fires a function that sends a JSON-ified error code
});

router.post('/login', function (req, res) { //call post() method which lets us create an HTTP POST request. First argument is path, second is callback/handler function

    User.findOne({ //findOne() is a Sequelize function that searches db for what we tell it to look for
        where: { //sequelize object that tells db to look for something matching its properties
            email: req.body.user.email //tells db to look in the request body at the email prop assigned to the user prop
        }
    })
        .then(function loginSuccess(user) { //when findOne() returns promise, loginSuccess function is called and passes in user
            if (user) { //checks if user exists in the db
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) { //compare() compares first argument from current request, and the second param from the db which it decrypts. Calls a function with an error and success state.
                    if (matches) { //if user exists and passwords match, fires function
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }); //calls jwt from installed dependency, sign() creates token. First param is payload/data we're sending,  user.id is primary key of user table, user refers to param in createSuccess func, which is our response we new user is created. Second param is signature, which helps encode/decode token, pulls from .env file for JWT_SECRET. Expiration sets when token will expire, ss*mm*hh
                        res.status(200).json({ //sets status code to 200 and adds object to response
                            user: user, //sends user object back in response
                            message: 'User successfully logged in!', //attaches success method to response object
                            sessionToken: token //passes value of token to response object
                        })
                    } else { //catches null and untrue values, where catch would not work. Returns when user is in db but login info does not match.
                        res.status(502).send({ error: "Login Failed" }); //sets status to 502 and sends an error message
                    }
                });
                
            } else { //catches null and untrue values, where catch would not work. Returns when user is not in the db.
                    res.status(500).json({ error: 'User does not exist.' }) //sets status to 500 and sends an error message
                }
                
        })
        .catch(err => res.status(500).json({ error: err })) //if promise is not successfully returned, fires a function that sends a JSON-ified error code
});
module.exports = router; //exports module for use outside the file