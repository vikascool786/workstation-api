// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306,
//   dialect: 'mysql',
//   logging: false,
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'kanban_db',
  'admin',
  'Poonam#@#1988',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;