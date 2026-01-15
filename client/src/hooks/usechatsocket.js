// src/hooks/useChatSocket.js
import { useEffect } from "react";
import socket from "../utils/socket.js";

//import getSocket from "../utils/socket.js"

export default function useChatSocket(conversationId, onReceiveMessage) {
    useEffect(() => {
        if (!conversationId) return;

        // 🔥 backend expects joinRoom
        socket.emit("joinRoom", conversationId);

        const handler = (message) => {
            onReceiveMessage(message);
        };

        socket.on("receiveMessage", handler);

        return () => {
            socket.off("receiveMessage", handler);
        };
    }, [conversationId, onReceiveMessage]);
}

