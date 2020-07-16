var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

const roomMap = new Map();
const codeMap = new Map();
socketApi.io = io;

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
  socket.on("startInterview", function (info) {
    console.log(`starting interview ${info.id}`);
    io.to(info.id).emit("movetoCode");
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

  socket.on("joinCodeRoom", function (info) {
    let code = codeMap.get(info.id);
    if (code) socket.broadcast.emit("update_code", code);
    socket.join(info.id);
  });

  socket.on("new_code", (info) => {
    codeMap.set(info.id, info.code);
    io.to(info.id).emit("update_code", info.code);
  });
  socket.on("disconnect", (evt) => {
    console.log("some people left");
  });
});

module.exports = socketApi;
