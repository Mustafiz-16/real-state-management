import express from "express";
import authRoutes from "./routes/auth.routes.js"
import propertyRoutes from "./routes/Property.routes.js"
import documentRoutes from "./routes/Document.routes.js"
import bookingRoutes from "./routes/Booking.routes.js"
import propertyImageRoutes from "./routes/Propertyimage.routes.js"
import savedPropertyRoutes from "./routes/SavedProperty.routes.js";
import contactRoutes from "./routes/Contact.routes.js";

import adminPropertyRoutes from "./routes/Admin.property.routes.js";


import conversationRoutes from "./routes/Conversation.routes.js";
import messageRoutes from "./routes/Message.routes.js";
import notificationRoutes from "./routes/Notification.routes.js";

import cors from "cors";

import path from "path";

// Note: dotenv.config() is called in server.js before this file is imported

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:5173"
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

// Don't call connectToDB() here - it will be called from server.js after env vars are loaded
// Export connectToDB so server.js can call it
export { default as connectToDB } from "./config/db.js";

app.use("/api/auth", authRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/documents", documentRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/property-images", propertyImageRoutes);

app.use("/api/saved-properties", savedPropertyRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/admin", adminPropertyRoutes);


app.use("/api/conversations", conversationRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/notifications", notificationRoutes);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("✅ Server is working perfectly!");
});



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// });

export default app;