import express from "express";
import {
  saveProperty,
  getSavedProperties,
  unsaveProperty,
} from "../controllers/SavedProperty.controllers.js";
import { protect }  from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/saved-properties/:propertyId
 * @desc    Buyer saves / bookmarks a property
 * @access  Private (Buyer)
 */
router.post(
  "/:propertyId",
  protect,
  saveProperty
);

/**
 * @route   GET /api/saved-properties
 * @desc    Get all saved/bookmarked properties of logged-in buyer
 * @access  Private (Buyer)
 */
router.get(
  "/",
  protect,
  getSavedProperties
);


router.delete("/:propertyId", protect, unsaveProperty);



export default router;
