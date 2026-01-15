import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/Message.contollers.js";

const router = express.Router();

router.post("/", protect, sendMessage); // optional, mostly Socket.io
router.get("/:conversationId", protect, getMessages);

export default router;
