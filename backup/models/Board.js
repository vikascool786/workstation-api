const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Board = sequelize.define('Board', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Board;
