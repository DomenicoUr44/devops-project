const { z } = require("zod");

const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title required")
    .max(100)
});

const updateTaskSchema = z.object({
  completed: z.boolean()
});

module.exports = {
  createTaskSchema,
  updateTaskSchema
};