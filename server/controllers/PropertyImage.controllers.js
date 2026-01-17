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


    const property = await Property.findById(propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const image = await PropertyImage.create({
      property_id: propertyId,
      imageUrl: req.file.path,
    });

    console.log("   ✅ Image saved:", image.imageUrl);
    res.status(201).json(image);
  } catch (err) {
    console.error("   ❌ Image upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

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


export const deletePropertyImage = async (req, res) => {
  try {
    const image = await PropertyImage.findById(req.params.imageId);
    
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }


    const publicId = getPublicIdFromUrl(image.imageUrl);
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }


    await PropertyImage.findByIdAndDelete(req.params.imageId);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};