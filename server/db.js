const Sequelize = require('sequelize'); //import Sequelize package
const sequelize = new Sequelize('journal-walkthrough', 'postgres', 'password', { //create Sequelize instance and create new Sequelize object, pass in db, username, and password
    host: 'localhost', //points to Sequelize port
    dialect: 'postgres' //identifies QL dialect being used
});

sequelize.authenticate().then( //calls authenticate() method, which returns a promise and then fires function
    function () { //if true, shows success message
        console.log('connected to journal-walkthrough postgres database'); 
    },
    function (err) { //if error, shows error message
        console.log(err);
    }
);
module.exports = sequelize; //export module for use in other files