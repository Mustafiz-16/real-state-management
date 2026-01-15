import Property from "../models/Property.js";
import AdminLog from "../models/AdminLog.js";
import PropertyImage from "../models/Propertyimage.js";
import Document from "../models/Document.js";

// Get a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner_id", "name email phone")
      .lean();

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Get images and documents for this property
    const images = await PropertyImage.find({ property_id: property._id });
    const documents = await Document.find({ property_id: property._id });

    const result = {
      ...property,
      images: images.map((i) => i.imageUrl),
      documents: documents.map((d) => d.fileUrl),
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner_id: req.user.id,
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await AdminLog.create({
      admin_id: req.user.id,
      action: "Approved property",
      target_type: "Property",
      target_id: property._id,
    });

    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApprovedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "approved" }).lean();

    const propertyIds = properties.map(p => p._id);

    const images = await PropertyImage.find({
      property_id: { $in: propertyIds }
    });

    const documents = await Document.find({
      property_id: { $in: propertyIds }
    });

    const result = properties.map(p => ({
      ...p,
      images: images
        .filter(i => i.property_id.toString() === p._id.toString())
        .map(i => i.imageUrl),
      documents: documents
        .filter(d => d.property_id.toString() === p._id.toString())
        .map(d => d.fileUrl),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      owner_id: req.user.id,
      status: "pending", // optional rule
    });

    if (!property) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const getOwnerProperties = async (req, res) => {
//   const properties = await Property.find({
//     owner_id: req.user.id,
//   });

//   res.json(properties);
// };
export const getOwnerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner_id: req.user.id }).lean();

    const propertyIds = properties.map(p => p._id);

    const images = await PropertyImage.find({
      property_id: { $in: propertyIds }
    });

    const documents = await Document.find({
      property_id: { $in: propertyIds }
    });

    const result = properties.map(p => ({
      ...p,
      images: images
        .filter(i => i.property_id.toString() === p._id.toString())
        .map(i => i.imageUrl),
      documents: documents
        .filter(d => d.property_id.toString() === p._id.toString())
        .map(d => d.fileUrl),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner_id: req.user.id, status: "pending" },
      req.body,
      { new: true }
    );
    if (!property) return res.status(403).json({ message: "Cannot update" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const rejectProperty = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        rejectionReason: reason,
      },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      success: true,
      message: "Property rejected",
      property,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


