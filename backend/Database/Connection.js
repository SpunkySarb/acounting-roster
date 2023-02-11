const {Sequelize } = require('sequelize');


const sequelize = new Sequelize('u236066539_rebels','u236066539_rebelsarb','0CandyMan0%12345',{
    host:'sql910.main-hosting.eu',
    dialect:'mysql'
});



module.exports = sequelize;