const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello", { message: "hello" });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    console.log(args);
  });
});

httpServer.listen(3001);
console.log("server started");
