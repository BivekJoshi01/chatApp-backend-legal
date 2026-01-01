// utils/socket.js
export const initializeSocket = (io) => {
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
};
