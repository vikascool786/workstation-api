const sequelize = require('../config/db');
const User = require('./User');
const Company = require('./Company');
const Project = require('./Project'); // ✅ New model
const Board = require('./Board');
const Column = require('./Column');
const Task = require('./Task');
const BoardUser = require('./BoardUser');

// ==================
// Model Relationships
// ==================

// Company ↔ Users
Company.hasMany(User);
User.belongsTo(Company);

// Company ↔ Projects
Company.hasMany(Project, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Project.belongsTo(Company, { foreignKey: 'companyId' });

// Project ↔ Boards
Project.hasMany(Board, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Board.belongsTo(Project, { foreignKey: 'projectId' });

// User ↔ Boards (as owner)
User.hasMany(Board, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
Board.belongsTo(User, { foreignKey: 'ownerId' });

// Board ↔ Columns
Board.hasMany(Column, { foreignKey: 'boardId', onDelete: 'CASCADE' });
Column.belongsTo(Board, { foreignKey: 'boardId' });

// Column ↔ Tasks
Column.hasMany(Task, { foreignKey: 'columnId', onDelete: 'CASCADE' });
Task.belongsTo(Column, { foreignKey: 'columnId' });

// Task ↔ Assigned User
User.hasMany(Task, { foreignKey: 'assignedUserId' });
Task.belongsTo(User, { foreignKey: 'assignedUserId' });

// Board ↔ Users (many-to-many for shared access)
Board.belongsToMany(User, {
  through: BoardUser,
  as: 'assignedUsers',
  foreignKey: 'boardId',
  otherKey: 'userId'
});
User.belongsToMany(Board, {
  through: BoardUser,
  as: 'assignedBoards',
  foreignKey: 'userId',
  otherKey: 'boardId'
});

// ==================
// Sync models
// ==================
sequelize.sync({ alter: true })
  .then(() => console.log('All models synced'))
  .catch(err => console.error('DB sync error', err));

module.exports = {
  sequelize,
  User,
  Company,
  Project, // ✅ Exported
  Board,
  Column,
  Task,
  BoardUser
};
