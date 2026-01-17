import express from "express";
import {
  uploadDocument,
  getDocuments,
} from "../controllers/Document.controllers.js";

import { protect } from "../middleware/auth.middleware.js";
import { uploadDocument as uploadDocumentMiddleware } from "../config/cloudinary.js";

const router = express.Router();


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


router.get(
  "/:propertyId",
  protect,
  getDocuments
);

export default router;
