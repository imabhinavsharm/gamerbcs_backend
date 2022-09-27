const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("getUsersCount", (data) => {
    if (data) {
      const roomName = data
      const roomSize = io.sockets.adapter.rooms.get(data).size
      const usersId = io.sockets.adapter.rooms.get(data)
      console.log(usersId);
      if (roomSize === 4) {
        console.log("This room is full");
      }
      let requiredPlayers =  ( 4 - roomSize)
      console.log(`There is currently ${requiredPlayers} players is required to start the game in room ${roomName}`);

    } else {
      console.log("there is no room currently");
    }
    // const clients = await io.fetchSockets(data).length
    // console.log(clients);
    // //to get the number of clients in this room
    // const numClients = clients ? Object.keys(clients).length : 0;

    // //to just emit the same event to all members of a room
    // io.to('Room Name').emit('new event', 'Updates');

    // for (const clientId in clients) {

    //   //this is the socket of each client in the room.
    //   const clientSocket = io.sockets.connected[clientId];

    //   //you can do whatever you need with this
    //   clientSocket.leave('Other Room')
    // }

  });

});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

