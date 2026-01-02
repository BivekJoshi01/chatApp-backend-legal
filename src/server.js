import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import colors from "colors";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { Server } from "socket.io";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./utils/socket.js";

import thirdPartyRoutes from "./routes/thirdParty.routes.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("API is Runnning Successfully");
});

app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/third-party", thirdPartyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8100;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server Started on PORT ${PORT}`.yellow.bold);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

initializeSocket(io);
