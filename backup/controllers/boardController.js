const { Board } = require('../models');
const { BoardUser } = require('../models');

exports.createBoard = async (req, res) => {
  const { name } = req.body;
  try {
    const board = await Board.create({ name, ownerId: req.user.id });
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({ where: { ownerId: req.user.id } });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignUserToBoard = async (req, res) => {
  const { boardId } = req.params;
  const { userId } = req.body;

  // console.log(`Assigning user ${JSON.stringify(req.body)} to board ${boardId}`);

  try {
    await BoardUser.create({ boardId, userId });
    res.status(200).json({ message: 'User assigned to board successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};