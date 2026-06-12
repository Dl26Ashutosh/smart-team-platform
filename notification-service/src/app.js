const express = require("express");
const cors = require("cors");

const notificationRoutes = require("./routes/notification.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notifications", notificationRoutes);

app.use(errorHandler);

module.exports = app;
