const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "API Gateway is running" });
});

// Auth Service
app.use("/api/auth", createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
  changeOrigin: true,
  pathRewrite: { "^/api/auth": "/auth" },
  onError: (err, req, res) => {
    console.error("Auth Service Error:", err);
    res.status(503).json({ message: "Auth Service unavailable" });
  },
}));

// User Service
app.use("/api/users", createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || "http://localhost:5002",
  changeOrigin: true,
  pathRewrite: { "^/api/users": "/users" },
  onError: (err, req, res) => {
    console.error("User Service Error:", err);
    res.status(503).json({ message: "User Service unavailable" });
  },
}));

// Project Service
app.use("/api/projects", createProxyMiddleware({
  target: process.env.PROJECT_SERVICE_URL || "http://localhost:5003",
  changeOrigin: true,
  pathRewrite: { "^/api/projects": "/projects" },
  onError: (err, req, res) => {
    console.error("Project Service Error:", err);
    res.status(503).json({ message: "Project Service unavailable" });
  },
}));

// Task Service
app.use("/api/tasks", createProxyMiddleware({
  target: process.env.TASK_SERVICE_URL || "http://localhost:5004",
  changeOrigin: true,
  pathRewrite: { "^/api/tasks": "/tasks" },
  onError: (err, req, res) => {
    console.error("Task Service Error:", err);
    res.status(503).json({ message: "Task Service unavailable" });
  },
}));

// Notification Service
app.use("/api/notifications", createProxyMiddleware({
  target: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5005",
  changeOrigin: true,
  pathRewrite: { "^/api/notifications": "/notifications" },
  onError: (err, req, res) => {
    console.error("Notification Service Error:", err);
    res.status(503).json({ message: "Notification Service unavailable" });
  },
}));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

module.exports = app;
