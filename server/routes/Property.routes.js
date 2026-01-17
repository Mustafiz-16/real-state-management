import express from "express";
import {
  createProperty,
  approveProperty,
  getOwnerProperties,
  deleteProperty,
  rejectProperty,
  updateProperty,
  getApprovedProperties,
  getPropertyById,
} from "../controllers/Property.controllers.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/owner/me", protect, getOwnerProperties);
router.delete("/:id", protect, deleteProperty);
//router.patch("/:id/reject", protect, rejectProperty); // admin





router.post("/", protect, createProperty);

// Owner updates a property (only if pending)
router.put("/:id", protect, updateProperty);







// Admin routes
router.patch("/:id/approve", protect, adminOnly, approveProperty);
router.patch("/:id/reject", protect, adminOnly, rejectProperty);

// routes/property.routes.js
router.get("/approved", getApprovedProperties);

// Get single property by ID (public)
router.get("/:id", getPropertyById);


export default router;
