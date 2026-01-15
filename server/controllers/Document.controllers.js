import Document from "../models/Document.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../config/cloudinary.js";

export const uploadDocument = async (req, res) => {
  try {
    console.log("📄 Document upload request received");
    console.log("   Body:", req.body);
    console.log("   File:", req.file ? { path: req.file.path, originalname: req.file.originalname } : "NO FILE");
    
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!req.body.propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }

    // Cloudinary returns the URL in req.file.path
    const doc = await Document.create({
      property_id: req.body.propertyId,
      uploaded_by: req.user.id,
      documentType: req.body.type || "Other",
      fileUrl: req.file.path, // Cloudinary URL
    });
    
    console.log("   ✅ Document saved:", doc.fileUrl);
    res.status(201).json(doc);
  } catch (err) {
    console.error("   ❌ Document upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ property_id: req.params.propertyId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.documentId);
    
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Delete from Cloudinary
    const publicId = getPublicIdFromUrl(doc.fileUrl);
    if (publicId) {
      // Use "raw" resource type for PDFs
      const resourceType = doc.fileUrl.includes(".pdf") ? "raw" : "image";
      await deleteFromCloudinary(publicId, resourceType);
    }

    // Delete from database
    await Document.findByIdAndDelete(req.params.documentId);
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Owner upload → Admin verify