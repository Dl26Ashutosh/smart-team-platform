const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.use(errorHandler);

module.exports = app;
