const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("admin", "manager", "user"),
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    paranoid: true, // enables soft deletes
    deletedAt: "deletedAt", // uses 'deletedAt' column for deletion tracking
  }
);

module.exports = User;
