import express from "express";
import {
  uploadPropertyImage,
  getPropertyImages,
  deletePropertyImage,
} from "../controllers/PropertyImage.controllers.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadImage } from "../config/cloudinary.js";

const router = express.Router();

// Multer error handling wrapper
const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error("Multer/Cloudinary Error:", err);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max size is 10MB." });
    }
    return res.status(400).json({ message: err.message || "File upload failed" });
  }
  next();
};

router.post(
  "/upload",
  protect,
  uploadImage.single("image"),
  handleMulterError,
  uploadPropertyImage
);

router.get("/:propertyId", getPropertyImages);

router.delete("/:imageId", protect, deletePropertyImage);

export default router;
