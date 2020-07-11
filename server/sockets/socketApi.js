var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;
let curcode;
io.on("connection", (socket) => {
  console.log("connected");
  socket.emit("update_code", curcode);
  socket.on("new_code", (newCode) => {
    curcode = newCode;
    socket.broadcast.emit("update_code", newCode);
  });
  socket.on("disconnect", (evt) => {
    console.log("some people left");
  });
});

module.exports = socketApi;
