import express from "express";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/Notification.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all notifications for logged-in user
router.get("/", protect, getNotifications);

// Get unread notification count
router.get("/unread-count", protect, getUnreadCount);

// Mark a single notification as read
router.patch("/:id/read", protect, markAsRead);

// Mark all notifications as read
router.patch("/read-all", protect, markAllAsRead);

// Delete a notification
router.delete("/:id", protect, deleteNotification);

export default router;
