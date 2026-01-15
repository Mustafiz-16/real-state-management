import Property from "../models/Property.js";
import Notification from "../models/Notification.js";

/* Get all pending properties */
export const getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "pending" })
      .populate("owner_id", "name email")
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

/* Approve property */
export const approveProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        isAvailable: true,
      },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Create notification for owner
    await Notification.create({
      user_id: property.owner_id,
      property_id: property._id,
      title: "Property Approved! 🎉",
      message: `Your property "${property.title}" has been approved and is now live on the marketplace.`,
      type: "property_approved",
    });

    res.json({ message: "Property approved successfully", property });
  } catch (err) {
    res.status(500).json({ message: "Approval failed", error: err.message });
  }
};

/* Reject property */
export const rejectProperty = async (req, res) => {
  try {
    const { reason } = req.body;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        isAvailable: false,
        rejectionReason: reason || "Not specified",
      },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Create notification for owner
    await Notification.create({
      user_id: property.owner_id,
      property_id: property._id,
      title: "Property Rejected ❌",
      message: `Your property "${property.title}" was rejected. Reason: ${reason || "Not specified"}. Please update and resubmit.`,
      type: "property_rejected",
    });

    res.json({ message: "Property rejected", property });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed", error: err.message });
  }
};
