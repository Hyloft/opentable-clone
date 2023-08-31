const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const Redis = require("ioredis").Redis;

const redis = new Redis();

const deleteTemporaryReservation = async (uuid) => {
  const reservationsJson = await redis.get("reservations");
  if (!reservationsJson) return;
  const reservations = JSON.parse(reservationsJson).reservations;
  await redis.set(
    "reservations",
    JSON.stringify({
      reservations: reservations.filter((r) => r.uuid != uuid),
    })
  );
};

const createTemporaryReservation = async (booking, uuid) => {
  let reservationsJson = await redis.get("reservations");
  if (!reservationsJson) reservationsJson = '{"reservations":[]}';
  const reservations = JSON.parse(reservationsJson).reservations;
  const redisData = JSON.stringify({
    reservations: [
      ...reservations,
      {
        booking,
        uuid,
      },
    ],
  });
  await redis.set("reservations", redisData);
};

io.on("connection", (socket) => {
  let uuid_ = ""
  // send a message to the client
  socket.emit("hello", { message: "hello" });

  // receive a message from the client
  socket.on("reserveTemporary", async ({ booking, uuid }) => {
    uuid_ = uuid
    await createTemporaryReservation(booking, uuid);
    socket.emit(`reservation=${uuid}`, { time: 120 });
    setTimeout(() => {
      deleteTemporaryReservation(uuid);
    }, 120 * 1000);
  });

  socket.on("endReservation", async (uuid) => {
    console.log("reservation ended");
    await deleteTemporaryReservation(uuid);
  });

  socket.conn.on("close",async ()=>{
    await deleteTemporaryReservation(uuid_)
  })
});

httpServer.listen(3001);
console.log("server started");
