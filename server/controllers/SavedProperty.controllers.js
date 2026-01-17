import SavedProperty from "../models/Saveproperty.js";



export const saveProperty = async (req, res) => {
  try {
    const saved = await SavedProperty.create({
      buyer_id: req.user.id,
      property_id: req.params.propertyId,
    });

    res.status(201).json({
      success: true,
      message: "Property saved successfully",
      data: saved,
    });

  } catch (err) {
    // duplicate key error (already saved)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Property already saved",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const unsaveProperty = async (req, res) => {
  await SavedProperty.findOneAndDelete({
    buyer_id: req.user.id,
    property_id: req.params.propertyId,
  });

  res.json({
    success: true,
    message: "Property removed from saved list",
  });
};


export const getSavedProperties = async (req, res) => {
  const data = await SavedProperty.find({ buyer_id: req.user.id })
    .populate("property_id");
  res.json(data);
};

