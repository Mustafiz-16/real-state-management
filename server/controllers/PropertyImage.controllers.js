import PropertyImage from "../models/Propertyimage.js";
import Property from "../models/Property.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";


export const uploadPropertyImage = async (req, res) => {
  try {
    console.log("📸 Image upload request received");
    console.log("   Body:", req.body);
    console.log("   File:", req.file ? { path: req.file.path, originalname: req.file.originalname } : "NO FILE");
    
    const { propertyId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }

    // optional safety check
    const property = await Property.findById(propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Cloudinary returns the URL in req.file.path
    const image = await PropertyImage.create({
      property_id: propertyId,
      imageUrl: req.file.path, // Cloudinary URL
    });

    console.log("   ✅ Image saved:", image.imageUrl);
    res.status(201).json(image);
  } catch (err) {
    console.error("   ❌ Image upload error:", err);
    res.status(500).json({ error: err.message });
  }
};
//Owner dashboard → Add property images
//Admin review page

export const getPropertyImages = async (req, res) => {
  try {
    const images = await PropertyImage.find({
      property_id: req.params.propertyId,
    });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Property details page
//Buyer browsing properties

export const deletePropertyImage = async (req, res) => {
  try {
    const image = await PropertyImage.findById(req.params.imageId);
    
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    const publicId = getPublicIdFromUrl(image.imageUrl);
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    // Delete from database
    await PropertyImage.findByIdAndDelete(req.params.imageId);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Owner dashboard (remove image)
//Admin moderation