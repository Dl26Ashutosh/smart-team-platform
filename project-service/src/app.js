const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/project.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);

app.use(errorHandler);

module.exports = app;
