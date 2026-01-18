
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: join(__dirname, '.env') });


console.log('🔍 Environment variables check:');
console.log('PORT:', process.env.PORT || 'NOT LOADED');
console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ LOADED' : '❌ NOT LOADED');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ LOADED' : '❌ NOT LOADED');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'NOT LOADED');
console.log('');

import app, { connectToDB } from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket/socket.js";


await connectToDB();

const PORT = process.env.PORT || 2000;
const server = http.createServer(app);



// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
// });

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // dev support
      process.env.FRONTEND_URL  // live frontend
    ],
    credentials: true,
    methods: ["GET", "POST"],
  },
});


initSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`MongoDB: ${process.env.MONGO_URI ? '✅ Connected' : '❌ Not configured'}`);
  console.log(`JWT Secret: ${process.env.JWT_SECRET ? '✅ Configured' : '❌ Not configured'}`);
});
