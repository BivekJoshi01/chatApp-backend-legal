const express = require("express");
const cors = require("cors");
const dontenv = require("dotenv");
const { chats } = require("./data/data");
require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/user.routes");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
