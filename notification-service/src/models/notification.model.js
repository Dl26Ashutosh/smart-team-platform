const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: String,
      required: true,
      index: true,
    },
    senderId: {
      type: String,
      default: "system",
    },
    type: {
      type: String,
      enum: ["task_assigned", "project_update", "comment_added", "status_changed", "mention"],
      default: "project_update",
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    data: {
      projectId: String,
      taskId: String,
      relatedUserId: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
