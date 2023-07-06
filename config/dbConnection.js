const { Sequelize } = require('sequelize');

// Option 3:Passing parameters separately (other dialects)
const sequelize = new Sequelize('digital_product', 'root', '', {
 host: '127.0.0.1',
  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

module.exports = {
  sequelize
}