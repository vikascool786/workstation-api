// middleware/companyGuard.js
const { Board } = require('../models');

module.exports = async function(req, res, next) {
  const boardId = req.params.boardId || req.body.boardId;
  if (!boardId) return res.status(400).json({ msg: 'Board ID required' });

  const board = await Board.findByPk(boardId);
  if (!board || board.companyId !== req.user.companyId) {
    return res.status(403).json({ msg: 'Forbidden: Tenant access denied' });
  }

  next();
};
