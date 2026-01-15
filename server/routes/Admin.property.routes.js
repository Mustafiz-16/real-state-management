import express from "express";
import {
  getPendingProperties,
  approveProperty,
  rejectProperty,
} from "../controllers/Admin.property.controllers.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/properties/pending",
  protect,
  adminOnly,
  getPendingProperties
);

router.patch(
  "/properties/:id/approve",
  protect,
  adminOnly,
  approveProperty
);

router.patch(
  "/properties/:id/reject",
  protect,
  adminOnly,
  rejectProperty
);

export default router;
