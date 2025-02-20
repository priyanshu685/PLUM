const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('User', {
            userid: {
        type: DataTypes.STRING,
        primaryKey: true  
        
    },
   Password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    username:{
            type:DataTypes.STRING,
            allowNull: false
    },
    emailid:{
            type: DataTypes.STRING,
            allowNull: false
    },
    phoneno:{
            type: DataTypes.STRING,
            allowNull: false
    },
    DOB:{
            type: DataTypes.DATE,
            allowNull: false
    },

    roleid:{
            type: DataTypes.INTEGER,
            allowNull: false
}
});
module.exports = Users;



