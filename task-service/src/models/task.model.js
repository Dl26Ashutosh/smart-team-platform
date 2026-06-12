const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    projectId: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      default: null,
    },
    createdBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "review", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    comments: [{
      userId: String,
      comment: String,
      createdAt: { type: Date, default: Date.now },
    }],
    attachments: [String],
    subtasks: [{
      title: String,
      completed: { type: Boolean, default: false },
    }],
    timeEstimate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
