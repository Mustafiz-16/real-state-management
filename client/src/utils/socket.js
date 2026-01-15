import { io } from "socket.io-client";

// Get backend URL from environment or use default
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL?.replace("/api", "") || "http://localhost:5001";

const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;


// utils/socket.js
// import { io } from "socket.io-client";

// let socket;

// export const getSocket = (userId) => {
//   if (!socket) {
//     socket = io("http://localhost:5000", {
//       auth: { userId },
//     });
//   }
//   return socket;
// };


// import { io } from "socket.io-client";

// const user = JSON.parse(localStorage.getItem("user"));

// const socket = io("http://localhost:5000", {
//   auth: {
//     userId: user?._id,
//     role: user?.role
//   }
// });

// export default socket;
