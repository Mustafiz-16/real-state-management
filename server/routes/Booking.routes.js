import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createBooking, updateBookingStatus } from "../controllers/Booking.controllers.js";

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Private (logged-in users)
 */
router.post("/", protect, createBooking);

/**
 * @route   PUT /api/bookings/:id
 * @desc    Update booking status
 * @access  Private (Admin or authorized user)
 */
router.put("/:id", protect, updateBookingStatus);

export default router;
