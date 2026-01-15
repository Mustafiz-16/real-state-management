//Price drop / booking / system notification

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },

    title: String,
    message: String,

    type: {
      type: String,
      enum: ["price_drop", "booking", "system", "property_approved", "property_rejected"],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Add index for faster queries
notificationSchema.index({ user_id: 1, isRead: 1 });

export default mongoose.model("Notification", notificationSchema);
