// node server which handel socket.io
const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  // if any new user joint
  socket.on("new-user-joined", (name) => {
    // console.log("newuser:" ,name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  // if some one send the message  brodcast it to other people
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  // if some one leave the chart
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
