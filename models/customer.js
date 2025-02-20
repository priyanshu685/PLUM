const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Customer = sequelize.define("Customer", {
  customerid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoincrement: true,
  },
  Cust_FName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cust_LName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  stateid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Countryid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  regionid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneno: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = Customer;
