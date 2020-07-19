var socket_io = require("socket.io");
const verifyToken = require("../helpers/verifyToken");
var io = socket_io();
var socketApi = {};

const roomMap = new Map();
const codeMap = new Map();
socketApi.io = io;

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("joinInterviewLobby", function (info, fn) {
    let tempUsers = roomMap.get(info.id);
    if (tempUsers) {
      if (tempUsers.userNames.indexOf(info.name) != -1) {
        //user is not added since they are already in the room list
      } else if (tempUsers.userNames.length > 1) {
        fn(false);
        return "too many users";
      } else {
        tempUsers.userNames = [...tempUsers.userNames, info.name];
        tempUsers.userIds = [...tempUsers.userIds, info.userId];
      }
    } else {
      tempUsers = {};
      tempUsers.userNames = [info.name];
      tempUsers.userIds = [info.userId];
    }
    roomMap.set(info.id, tempUsers);
    fn(true);
    socket.join(info.id);
    io.to(info.id).emit("joinedRoom", tempUsers);
  });
  socket.on("startInterview", function (info) {
    tempCode = { userIds: info.participants.userIds };
    codeMap.set(info.id, tempCode);
    io.to(info.id).emit("movetoCode", info.id);
  });
  socket.on("leaveRoom", function (info) {
    console.log("leaving room");
    let tempUsers = roomMap.get(info.id);
    if (tempUsers) {
      const idIndex = tempUsers.userIds.indexOf(info.userId);
      if (idIndex > -1) {
        tempUsers.userNames.splice(idIndex, 1);
        tempUsers.userIds.splice(idIndex, 1);
      }
    }
    roomMap.set(info.id, tempUsers);
    io.to(info.id).emit("joinedRoom", tempUsers);
  });

  socket.on("joinCodeRoom", function (info, fn) {
    let codeObj = codeMap.get(info.id);
    if (codeObj) {
      if (codeObj.userIds.indexOf(info.userId) == -1) {
        fn(false);
      }
      socket.join(info.id);
      io.to(info.id).emit("update_code", codeObj);
    } else {
      fn(false);
    }
  });
  socket.on("checkInCodeRoom", (info, fn) => {
    let res = [];
    info.forEach((id) => {
      let obj = codeMap.get(id);
      if (obj) res.push(id);
    });
    fn(res);
  });
  socket.on("new_code", (info) => {
    let oldCode = codeMap.get(info.id);
    oldCode.code = info.code;
    codeMap.set(info.id, oldCode);
    io.to(info.id).emit("update_code", info);
  });
  socket.on("endInterview", (info) => {
    io.to(info.id).emit("toReview", info);
    codeMap.set(info.id, {});
  });
  socket.on("disconnect", (evt) => {
    console.log("some people left");
  });
});

module.exports = socketApi;
