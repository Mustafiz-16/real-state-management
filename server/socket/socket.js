

import mongoose from "mongoose";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (conversationId) => {
      if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) return;
      socket.join(conversationId);
      console.log(`User ${socket.id} joined room ${conversationId}`);
    });

    socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
      try {
        if (!conversationId || !senderId || !text?.trim()) return;
        if (!mongoose.Types.ObjectId.isValid(conversationId)) return;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) return;

        const message = await Message.create({
          conversation_id: conversationId,
          sender_id: senderId,
          text: text.trim(),
        });

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: text.trim(),
          lastMessageAt: new Date(),
          lastMessageSender: senderId,
        });

        // Emit message safely
        io.to(conversationId).emit("receiveMessage", message.toObject());
      } catch (err) {
        console.error("Socket message error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
