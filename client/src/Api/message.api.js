// import API from "./axios";

// export const getMessages = (conversationId) =>
//   API.get(`/messages/${conversationId}`);


import API from "./axios";

// GET messages
export const getMessages = (conversationId) =>
  API.get(`/messages/${conversationId}`);

// POST message (optional - socket দিয়ে করছো)
export const sendMessage = (data) =>
  API.post("/messages", data);