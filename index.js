const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const PORT = 5000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/", (req, res) => {
  res.json(true);
});

const server = app.listen(PORT, () => {
  console.log("SERVER LISTENING ON PORT 5000");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("socket:", socket.id);
  console.log("SOMEONE IS CONNECTED");

  socket.on("disconnect", () => {
    console.log("THAT SOCKET DISCONNECTED");
  });

  socket.on("new-messag", (data) => {
    console.log("data:", data);
    io.emit("message", "SOMEONE IS TYPING");
  });
});
