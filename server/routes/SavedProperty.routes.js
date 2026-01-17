import express from "express";
import {
  saveProperty,
  getSavedProperties,
  unsaveProperty,
} from "../controllers/SavedProperty.controllers.js";
import { protect }  from "../middleware/auth.middleware.js";

const router = express.Router();


router.post(
  "/:propertyId",
  protect,
  saveProperty
);


router.get(
  "/",
  protect,
  getSavedProperties
);


router.delete("/:propertyId", protect, unsaveProperty);



export default router;
