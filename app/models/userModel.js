var Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('usuarios',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        nombre:{
            type: Sequelize.STRING,
            allowNull:false
        },
        email:{
            type: Sequelize.STRING,
            allowNull:false
        },
        role:{
            type: Sequelize.STRING,
            allowNull:false
        },
        ubicacion:{
            type: Sequelize.STRING,
            allowNull:false
        },
        user:{
            type: Sequelize.STRING,
            allowNull:false
        },
        password:{
            type: Sequelize.STRING,
            allowNull:false
        }

    }, {timestamps:false});

    return User;
}