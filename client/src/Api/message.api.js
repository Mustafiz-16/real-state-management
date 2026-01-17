
import API from "./axios";


export const getMessages = (conversationId) =>
  API.get(`/messages/${conversationId}`);


export const sendMessage = (data) =>
  API.post("/messages", data);