const express = require("express");
const cors = require("cors");
const dontenv = require("dotenv");
require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/user.routes");
const chatRoutes = require("./routes/chat.routes");
const coreRoutes = require("./routes/core/core.route");
const inventoryRoutes = require("./routes/inventory/inventory.route");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());
dontenv.config();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is Runnning Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/core", coreRoutes);
app.use("/api/inventory", inventoryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
