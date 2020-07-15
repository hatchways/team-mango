var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

const roomMap = new Map();
socketApi.io = io;
let curcode;
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("joinInterviewLobby", function (info, fn) {
    let tempUser = roomMap.get(info.id);
    if (tempUser) {
      if (tempUser.indexOf(info.name) != -1) {
        //user is not added since they are already in the room list
      } else if (tempUser.length > 1) {
        fn(false);
        return "too many users";
      } else tempUser.push(info.name);
    } else tempUser = [info.name];
    roomMap.set(info.id, tempUser);
    fn(true);
    socket.join(info.id);
    io.to(info.id).emit("joinedRoom", tempUser);
  });

  socket.on("leaveRoom", function (info) {
    console.log("leaving room");
    let tempUser = roomMap.get(info.id);
    if (tempUser) {
      const index = tempUser.indexOf(info.name);
      if (index > -1) {
        tempUser.splice(index, 1);
      }
    }
    roomMap.set(info.id, tempUser);
    io.to(info.id).emit("joinedRoom", tempUser);
  });

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
