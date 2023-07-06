const { Sequelize, DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("../config/dbConnection");


const Product = sequelize.define(
  "Product",
  {
    // Model attributes are defined here
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER(11),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    slug: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    // If don't want createdAt
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
    },
    // currencies: {
    //   field: "product_currencies.currency_id",
    //   type: Sequelize.STRING,
    //  }
  },
  {
    // Other model options go here
  }
);


module.exports = Product;
