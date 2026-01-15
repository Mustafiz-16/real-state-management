import SavedProperty from "../models/Saveproperty.js";

// export const saveProperty = async (req, res) => {
//   try {
//     const saved = await SavedProperty.create({
//       buyer_id: req.user.id,
//       property_id: req.params.propertyId,
//     });
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: "Already saved" });
//   }
// };

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

// export const getSavedProperties = async (req, res) => {
//   try {
//     const userId = req.user._id; // from protect middleware
//     const savedProperties = await SavedProperty.find({ user: userId }).populate('property');
//     res.status(200).json({ success: true, savedProperties });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
