const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role_Permissions = sequelize.define('Role_Permissions', {
            roleid: {
        type: DataTypes.INTEGER,
        allowNull:false
        
        
    },
    permissionsid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Role_Permissions;