
const {Sequelize, DataTypes, INTEGER} = require('sequelize');
const { sequelize } = require("../config/dbConnection");
const Category = sequelize.define('Category', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER(11)
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE,
  },

}, {
  // Other model options go here
});

module.exports = Category;
