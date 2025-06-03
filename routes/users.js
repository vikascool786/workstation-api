const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const userController = require('../controllers/userController');

// Get own profile
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The current user's profile data
 *       401:
 *         description: Unauthorized, invalid token
 */
router.get('/me', auth, userController.getProfile);

/**
 * @swagger
 * /api/users/update-password:
 *   put:
 *     summary: Update the current user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized, incorrect old password
 */
router.put('/update-password', auth, userController.updatePassword);

// Admin-only: get all users
router.get('/', auth, role('admin'), userController.getAllUsers);


module.exports = router;
