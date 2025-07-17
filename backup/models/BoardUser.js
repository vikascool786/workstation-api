const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BoardUser = sequelize.define('BoardUser', {
  boardId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = BoardUser;