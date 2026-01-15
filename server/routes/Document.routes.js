import express from "express";
import {
  uploadDocument,
  getDocuments,
} from "../controllers/Document.controllers.js";

import { protect } from "../middleware/auth.middleware.js";
import { uploadDocument as uploadDocumentMiddleware } from "../config/cloudinary.js";

const router = express.Router();

// Multer error handling wrapper
const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error("Multer/Cloudinary Error:", err);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max size is 20MB." });
    }
    return res.status(400).json({ message: err.message || "File upload failed" });
  }
  next();
};

router.post(
  "/upload",
  protect,
  uploadDocumentMiddleware.single("file"),
  handleMulterError,
  uploadDocument
);

/**
 * @route   GET /api/documents/:propertyId
 * @desc    Get all documents of a property
 * @access  Private (Owner/Admin)
 */
router.get(
  "/:propertyId",
  protect,
  getDocuments
);

export default router;
