const express = require('express');
const auth = require('../middleware/auth');
const boardController = require('../controllers/boardController');

const router = express.Router();

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Board created
 */
router.post('/', auth, boardController.createBoard);

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Get all boards for the current user
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: List of boards
 */
router.get('/', auth, boardController.getBoards);
router.post('/:boardId/assign', auth, boardController.assignUserToBoard);

module.exports = router;
