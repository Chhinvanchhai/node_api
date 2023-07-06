
const {Sequelize, DataTypes, INTEGER} = require('sequelize');
const { sequelize } = require("../config/dbConnection");
const ProductCurrency = sequelize.define('product_currencies', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER(11)
  },
  currency_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  sale_price: {
    type: DataTypes.DOUBLE,
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

module.exports = ProductCurrency;
