const pool = require("../db/database");

const getAllTasks = async (userId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM tasks
      WHERE user_id = $1
      ORDER BY id ASC
    `,
    [userId]
  );

  return result.rows;
};

const createNewTask = async (
  title,
  userId
) => {
  const result = await pool.query(
    `
      INSERT INTO tasks (title, user_id)
      VALUES ($1, $2)
      RETURNING *
    `,
    [title, userId]
  );

  return result.rows[0];
};
const updateTaskStatus = async (
  id,
  completed,
  userId
) => {
  const result = await pool.query(
    `
      UPDATE tasks
      SET completed = $1
      WHERE id = $2
      AND user_id = $3
      RETURNING *
    `,
    [completed, id, userId]
  );

  return result.rows[0];
};

const removeTask = async (
  id,
  userId
) => {
  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1
      AND user_id = $2
      RETURNING *
    `,
    [id, userId]
  );

  return result.rows[0];
};

module.exports = {
  getAllTasks,
  createNewTask,
  updateTaskStatus,
  removeTask
};