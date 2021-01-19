let express = require('express'); //import Express framework and store in variable
let router = express.Router(); //stores the Express Router() method in a variable. Router() returns a router object.

router.post('/add', function (req, res) { //calls get() method, passing a path and a callback/handler function
    let number1 = req.body.num1; //stores number from request body as variable
    let number2 = req.body.num2;
    let obj = { total: number1+number2 } //stores calculation in a variable
    res.json(obj); //returns calculation as a json
})

module.exports = router //exports module to use in other files