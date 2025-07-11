const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleCompleted,
} = require("../controllers/todoController");

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id/toggle", toggleCompleted);

module.exports = router;
