import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: string): Socket => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL_RENDER as string, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket?.id);

      // join user-specific room
      socket?.emit("join", userId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
