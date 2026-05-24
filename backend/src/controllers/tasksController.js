const {
  getAllTasks,
  createNewTask,
  updateTaskStatus,
  removeTask
} = require("../services/tasksService");

const asyncHandler = require(
  "../middleware/asyncHandler"
);

const getTasks = asyncHandler(
  async (req, res) => {

    const userId =
      req.user.userId;

    const tasks =
      await getAllTasks(userId);

    res.json(tasks);
  }
);

const createTask = asyncHandler(
  async (req, res) => {

    const { title } = req.body;

    const userId =
      req.user.userId;

    if (!title) {
      return res.status(400).json({
        error: "Title is required"
      });
    }

    const task =
      await createNewTask(
        title,
        userId
      );

    res.status(201).json(task);
  }
);

const updateTask = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    const { completed } =
      req.body;

    const userId =
      req.user.userId;

    const updatedTask =
      await updateTaskStatus(
        id,
        completed,
        userId
      );

    if (!updatedTask) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json(updatedTask);
  }
);

const deleteTask = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    const userId =
      req.user.userId;

    const deletedTask =
      await removeTask(
        id,
        userId
      );

    if (!deletedTask) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json({
      message:
        `Task ${id} deleted`
    });
  }
);

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};