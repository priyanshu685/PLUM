const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Designations = sequelize.define('Designation', {
            desigid: {
        type: DataTypes.INTEGER,
         primarykey: true,
         autioIncrement:true,
        allowNull:false
        
        
    },
    desigName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Country_State;



