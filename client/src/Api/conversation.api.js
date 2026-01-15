import API from "./axios";

export const getConversations = () =>
  API.get("/conversations");

export const createConversation = (data) =>
  API.post("/conversations", data);

export const getConversationById = (id) =>
  API.get(`/conversations/${id}`);
