const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => { //export module so Sequelize can create the users table with an anon function that will return value of what sequelize.define creates
    const User = sequelize.define('user', { //call define() method which maps model props in server file to a Postgres table. user argument will create a user table. 
        email: { //argument of define() that is an object, email becomes a column with properties of the defined values
            type: DataTypes.STRING, //defines the acceptable format of the column data. DataTypes is a sequelize function.
            allowNull: false, //optional property that allows/disallows empty data to be sent through
            unique: true //optional property that allows/disallows duplicate data to be sent
        },
        password: { //argument of define() that is an object, password becomes a column with properties of the defined values
            type: DataTypes.STRING, //defines the acceptable format of the column data. DataTypes is a sequelize function.
            allowNull: false //optional property that allows/disallows empty data to be sent through
        },
    });
    return User; //returns value of what sequelize.define creates
}