import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createConversation, getConversations, getConversationById } from "../controllers/Conversation.controllers.js";

const router = express.Router();

router.post("/", protect, createConversation);
router.get("/", protect, getConversations);
router.get("/:id", protect, getConversationById);

export default router;
