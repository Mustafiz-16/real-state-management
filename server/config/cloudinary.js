import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Ensure env vars are loaded (needed because this file may be imported before server.js loads dotenv)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log Cloudinary config status
console.log("☁️ Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "NOT SET",
  api_key: process.env.CLOUDINARY_API_KEY ? "SET" : "NOT SET",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "NOT SET",
});

// Storage for property images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "property_management/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [{ width: 1200, height: 800, crop: "limit", quality: "auto" }],
  },
});

// Storage for documents (PDFs, etc.)
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "property_management/documents",
    allowed_formats: ["pdf", "jpg", "jpeg", "png"],
    resource_type: "auto",
  },
});

// Multer upload instances
export const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

// Helper to delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};

// Helper to extract public_id from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  
  // Cloudinary URLs look like: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/filename.ext
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  
  if (uploadIndex === -1) return null;
  
  // Get everything after "upload/vXXX/" and remove file extension
  const pathParts = parts.slice(uploadIndex + 2); // Skip "upload" and version
  const fullPath = pathParts.join("/");
  
  // Remove file extension
  return fullPath.replace(/\.[^/.]+$/, "");
};

export default cloudinary;
