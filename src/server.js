import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import userRoutes from "./routes/user.routes.js";
import coreRoutes from "./routes/core/core.route.js";
import chatRoutes from "./routes/chat.routes.js";
import inventoryRoutes from "./routes/inventory/inventory.route.js";
import buySellRoutes from "./routes/buySell/buySell.routes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import { connectDB } from "./config/db.js";
import { createDefaultAdminUser } from "./utils/createDefaultAdminUser.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5100",
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
app.use("/api/buySell", buySellRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7100;
app.listen(PORT, async () => {
  await connectDB();
  await createDefaultAdminUser();
  console.log(`Server Started on PORT ${PORT}`.yellow.bold);
});
