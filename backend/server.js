import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

// const chatRoutes = require("./routes/chat.routes");
// const coreRoutes = require("./routes/core/core.route");
// const inventoryRoutes = require("./routes/inventory/inventory.route");

// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

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
// app.use("/api/chat", chatRoutes);
// app.use("/api/core", coreRoutes);
// app.use("/api/inventory", inventoryRoutes);

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 7100;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server Started on PORT ${PORT}`.yellow.bold);
});
