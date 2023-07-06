const { Sequelize, DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const User = sequelize.define(
  "User",
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
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    enable_ga: {
      type: DataTypes.STRING,
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
  },
  {
    // Other model options go here
  }
);
User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hashSync(user.password, 8);
  user.password = hashedPassword;
});
// db.sync();

module.exports = User;
