require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const connectDB = require("./config/db");
const app = require("./app");

connectDB();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join_room", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room`);
  });

  socket.on("send_notification", (data) => {
    io.to(`user_${data.recipientId}`).emit("receive_notification", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
