const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Column = sequelize.define("Column", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  boardId: {
    type: DataTypes.INTEGER, // or UUID depending on your setup
    allowNull: false,
  },
});

module.exports = Column;
