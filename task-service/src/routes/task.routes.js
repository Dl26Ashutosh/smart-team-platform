const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  addComment,
  updateTaskStatus,
} = require("../controller/task.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getAllTasks);
router.get("/:taskId", authMiddleware, getTask);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);
router.post("/:taskId/comments", authMiddleware, addComment);
router.patch("/:taskId/status", authMiddleware, updateTaskStatus);

module.exports = router;
