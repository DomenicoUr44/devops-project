const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/tasksController");

const validate = require(
  "../middleware/validate"
);

const {
  createTaskSchema,
  updateTaskSchema
} = require(
  "../schemas/taskSchemas"
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all user tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get(
  "/",
  authMiddleware,
  getTasks
);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Docker
 *     responses:
 *       201:
 *         description: Task created
 */
router.post(
  "/",
  authMiddleware,
  validate(createTaskSchema),
  createTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task status
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updateTaskSchema),
  updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

module.exports = router;