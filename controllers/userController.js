const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(401).json({ msg: 'Old password incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user info
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'role']
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: list all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'email', 'role'], paranoid: false });
    users.map(u => ({
      ...u.get(),
      isDeleted: !!u.deletedAt
    }));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    await user.destroy();  // Soft delete
    res.json({ msg: 'User soft-deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

