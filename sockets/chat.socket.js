import { Server } from "socket.io";
import prisma from "../prisma/prisma.js";
import server from "../server.js";

export const initializeSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("chatMessage", async ({ roomId, message, userId }) => {
      try {
        const newMessage = await prisma.message.create({
          data: {
            content: message,
            userId,
            chatRoomId: roomId,
          },
        });
        io.to(roomId).emit("newMessage", newMessage);
      } catch (error) {
        console.log("Error while saving the message");
      }
    });
    socket.on("disconnect", async () => {
      console.log("A user disconnected", socket.id);
    });
  });

  return io;
};
