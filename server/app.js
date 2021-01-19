require("dotenv").config(); //imports dotenv package
let express = require('express'); //imports express NPM package from our dependencies
const sequelize = require('./db');  //imports db file
let app = express(); //creates an instance of express with an express function

let journal = require('./controllers/journalcontroller') //import route object from journalcontroller.js and store in a variable
let user = require('./controllers/usercontroller') //import route object from usercontroller.js and store in a variable
let calc = require('./controllers/calculatorcontroller')

sequelize.sync(); //calls sync() method, which syncs all models defined to the db

app.use(express.json()); //express.json() is a middleware func that allows us to use req.body. It JSON-ifies the request and must go above all other app.use routes.

app.use('/user', user); //call app.use, first parameter creates a base URL, second parameter we pass in user object, which will treat all routes in that file as sub-routes
app.use('/journal', journal); //call app.use, first parameter creates a base URL, second parameter we pass in journal object, which will treat all routes in that file as sub-routes
app.use('/calculator', calc);


app.listen(3000, function () { //starts a UNIX socket and listens for connections on the given path
    console.log('App is listening on port 3000') //callback function to let us know the connection was successful
})

