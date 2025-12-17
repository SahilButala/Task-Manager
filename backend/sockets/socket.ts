import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

/**
 * Initialize Socket.io
 */
export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("join", (userId: string) => {
    if (!userId) return;

    socket.join(userId);
    console.log(`👤 User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});



  return io;
};

/**
 * Get io instance anywhere (controllers, services)
 */
export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
