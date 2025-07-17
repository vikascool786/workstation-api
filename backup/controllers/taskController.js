const { Task, Column, Board } = require("../models");

exports.addTask = async (req, res) => {
  const { title, description, order } = req.body;
  const { columnId } = req.params;

  try {
    const column = await Column.findByPk(columnId);
    const board = await Board.findByPk(column.boardId);

    if (!column || board.ownerId !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const task = await Task.create({ title, description, order, columnId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [["createdAt", "DESC"]], // Or by 'order', etc.
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching all tasks" });
  }
};

exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching task" });
  }
};

exports.getTasksByColumn = async (req, res) => {
  const { columnId } = req.params;

  try {
    const tasks = await Task.findAll({
      where: { columnId },
      order: [["order", "ASC"]], // Optional: sort by order
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

exports.moveTask = async (req, res) => {
  const { newColumnId, newOrder } = req.body;
  const { taskId } = req.params;

  try {
    const task = await Task.findByPk(taskId, {
      include: { model: Column, include: Board },
    });

    if (!task || task.Column.Board.ownerId !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    task.columnId = newColumnId;
    task.order = newOrder;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId, {
      include: { model: Column, include: Board },
    });

    if (!task || task.Column.Board.ownerId !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    await task.destroy();
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getTasks = async (req, res) => {
  const { columnId } = req.params;

  try {
    const tasks = await Task.findAll({ where: { columnId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
