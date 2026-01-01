import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
// import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import thirdPartyRoutes from "./routes/thirdParty.routes.js";
import { Server } from "socket.io";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5000",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("API is Runnning Successfully");
});

// app.use("/api/user", userRoutes);
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
    origin: process.env.CLIENT_URL || "http://localhost:5100",
  },
});

io.on("connection", (socket) => {
  // console.log("Connected to socket.io");//work here good

  socket.on("setup", (userData) => {
    socket.join(userData);
    // console.log(userData, "logged UserId");//works good
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    // console.log("🚀 ~ room:", room)
    socket.join(room);
    // console.log("User Joined Room: " + room);//works good
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
