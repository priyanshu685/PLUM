const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permissions = sequelize.define('Permissions', {
            Permissionsid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
        
    },
    PermissionsName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Permissions;