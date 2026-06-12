const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
