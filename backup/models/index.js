const sequelize = require('../config/db');
const User = require('./User');
const Board = require('./Board');
const Column = require('./Column');
const Task = require('./Task');
const BoardUser = require('./BoardUser');

// Relationships
User.hasMany(Board, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
Board.belongsTo(User, { foreignKey: 'ownerId' });

Board.hasMany(Column, { foreignKey: 'boardId', onDelete: 'CASCADE' });
Column.belongsTo(Board, { foreignKey: 'boardId' });

Column.hasMany(Task, { foreignKey: 'columnId', onDelete: 'CASCADE' });
Task.belongsTo(Column, { foreignKey: 'columnId' });

User.hasMany(Task, { foreignKey: 'assignedUserId' });
Task.belongsTo(User, { foreignKey: 'assignedUserId' });

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

// Sync models
sequelize.sync({ alter: true })
  .then(() => console.log('All models synced'))
  .catch(err => console.error('DB sync error', err));

module.exports = {
  sequelize,
  User,
  Board,
  Column,
  Task,
  BoardUser
};
