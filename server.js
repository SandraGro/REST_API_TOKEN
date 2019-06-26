var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var tokenController = require('./app/controllers/tokenController');
var userModel = require('./app/models/userModel');
const express = require('express');
const app = express();
const port = 3000;
app.use(bodyParser.json());

const sequelize = new Sequelize('token_practica', 'root', 'MySQLPass', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.log('Unable to connect the database', err);
    });
tokenController(app, userModel(sequelize));
app.listen(port, () => console.log(`App listening on port ${port}`))
console.log('App is running');