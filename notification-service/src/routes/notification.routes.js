const express = require("express");
const router = express.Router();
const {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} = require("../controller/notification.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createNotification);
router.get("/user/:userId", authMiddleware, getUserNotifications);
router.get("/user/:userId/unread-count", authMiddleware, getUnreadCount);
router.put("/:notificationId/read", authMiddleware, markAsRead);
router.put("/user/:userId/read-all", authMiddleware, markAllAsRead);
router.delete("/:notificationId", authMiddleware, deleteNotification);

module.exports = router;
