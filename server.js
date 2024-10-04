import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
 // console.log("a user connected: ",socket.id);
  
 const getActiveRooms = () => {
  const rooms = [...io.sockets.adapter.rooms.keys()].filter(
    (room) => !io.sockets.adapter.sids.get(room)
  );
  return rooms;
};

// Send the list of rooms to all connected clients
const emitRooms = () => {
  const rooms = getActiveRooms();
  io.emit('roomList', rooms); // Broadcast room list to all clients
};

// Send the updated room list whenever a new client requests it
socket.on('getRooms', () => {
  emitRooms(); // Send the rooms to all clients
});

// Join a specific room and then broadcast the updated room list
socket.on('joinRoom', (room) => {
  socket.join(room);
  console.log(`User with ID ${socket.id} joined room: ${room}`);
  emitRooms(); // Broadcast updated room list after join
});

   socket.on("sendMessage", (message)=>{
    io.emit("receiveMessage", message);
   })
  });


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1); 
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});