const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Departments = sequelize.define('Department', {
            deptid: {
        type: DataTypes.INTEGER,
        primarykey: true,
        autoincrement: true,
        allowNull:false
        
        
    },
            dname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Country_State;



