const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Country_State = sequelize.define('Country_State', {
            countryid: {
        type: DataTypes.INTEGER,
        allowNull:false
        
        
    },
    stateid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Country_State;



