const express = require('express');
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

const router = express.Router();

/**
 * @swagger
 * /api/tasks/{columnId}:
 *   post:
 *     summary: Add a new task to a specific column
 *     tags: [Tasks]
 *     parameters:
 *       - name: columnId
 *         in: path
 *         required: true
 *         description: The ID of the column where the task will be added
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/:columnId/tasks', auth, taskController.addTask);

/**
 * @swagger
 * /api/tasks/{taskId}/move:
 *   put:
 *     summary: Move a task to a new column
 *     tags: [Tasks]
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to be moved
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newColumnId:
 *                 type: string
 *               newOrder:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task moved successfully
 *       400:
 *         description: Invalid input or task not found
 */
router.put('/:taskId/move', auth, taskController.moveTask);

/**
 * @swagger
 * /api/tasks/{columnId}:
 *   get:
 *     summary: Get all tasks for a specific column
 *     tags: [Tasks]
 *     parameters:
 *       - name: columnId
 *         in: path
 *         required: true
 *         description: The ID of the column
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks
 *       404:
 *         description: Column not found
 */
router.get('/:columnId/tasks', auth, taskController.getTasksByColumn);

/**
 * @swagger
 * /api/tasks/id/{taskId}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
router.get('/id/:taskId', auth, taskController.getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *       500:
 *         description: Server error
 */
router.get('/', auth, taskController.getAllTasks);


/**
 * @swagger
 * /api/tasks/{taskId}:
 *   delete:
 *     summary: Delete a specific task
 *     tags: [Tasks]
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:taskId', auth, taskController.deleteTask);

module.exports = router;
