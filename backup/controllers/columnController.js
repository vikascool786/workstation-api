const { Board, Column, Task, BoardUser } = require('../models');

exports.addColumn = async (req, res) => {
  const { name, order } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findOne({ where: { id: boardId, ownerId: req.user.id } });
    if (!board) return res.status(403).json({ msg: 'Board not found or access denied' });

    const column = await Column.create({ name, order, boardId });
    res.status(201).json(column);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getColumnsByBoard = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user.id;

  try {
    // Check access (owner or assigned user)
    const board = await Board.findOne({
      where: { id: boardId },
      include: [{
        association: 'assignedUsers',
        attributes: ['id'],
        through: { attributes: [] } // omit join table details
      }]
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const isOwner = board.ownerId === userId;
    const isAssigned = board.assignedUsers.some(user => user.id === userId);

    if (!isOwner && !isAssigned) {
      return res.status(403).json({ message: 'Access denied: not assigned to this board' });
    }

    // Fetch columns if access is valid
    const columns = await Column.findAll({
      where: { boardId },
      include: [{
        model: Task,
        order: [['order', 'ASC']],
      }],
      order: [['order', 'ASC']]
    });

    res.status(200).json(columns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching columns' });
  }
};


// exports.getColumnsByBoard = async (req, res) => {
//   const { boardId } = req.params;

//   try {
//     const columns = await Column.findAll({
//       where: { boardId },
//       include: [{
//         model: Task,
//         order: [['order', 'ASC']], // optional: sort tasks by order
//       }],
//       order: [['order', 'ASC']], // optional: sort by order
//     });

//     res.status(200).json(columns);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error while fetching columns' });
//   }
// };

exports.updateColumn = async (req, res) => {
  const { boardId, columnId } = req.params;
  const { name, order } = req.body;

  try {
    const column = await Column.findOne({
      where: {
        id: columnId,
        boardId: boardId,
      },
    });

    if (!column) {
      return res.status(404).json({ message: 'Column not found for this board' });
    }

    // Update fields
    column.name = name ?? column.name;
    column.order = order ?? column.order;

    await column.save();

    res.status(200).json({ message: 'Column updated successfully', column });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating column' });
  }
};
