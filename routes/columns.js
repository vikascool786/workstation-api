const express = require('express');
const auth = require('../middleware/auth');
const columnController = require('../controllers/columnController');

const router = express.Router();

/**
 * @swagger
 * /api/columns/{boardId}:
 *   post:
 *     summary: Add a new column to a specific board
 *     tags: [Columns]
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         description: The ID of the board where the column will be added
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Column created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/:boardId/columns', auth, columnController.addColumn);

/**
 * @swagger
 * /api/boards/{boardId}/columns:
 *   get:
 *     summary: Get all columns for a specific board
 *     tags: [Columns]
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         description: The ID of the board
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of columns
 *       404:
 *         description: Board not found
 */
router.get('/:boardId/columns', auth, columnController.getColumnsByBoard);

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}:
 *   put:
 *     summary: Update a specific column under a board
 *     tags: [Columns]
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         description: ID of the board
 *         schema:
 *           type: string
 *       - name: columnId
 *         in: path
 *         required: true
 *         description: ID of the column to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Column updated successfully
 *       404:
 *         description: Column not found
 */
router.put('/:boardId/columns/:columnId', auth, columnController.updateColumn);

module.exports = router;
