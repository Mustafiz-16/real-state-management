import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createBooking, updateBookingStatus } from "../controllers/Booking.controllers.js";

const router = express.Router();


router.post("/", protect, createBooking);


router.put("/:id", protect, updateBookingStatus);

export default router;
