const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  columnId: {
    type: DataTypes.INTEGER, // or UUID
    allowNull: false,
  },
});

module.exports = Task;
