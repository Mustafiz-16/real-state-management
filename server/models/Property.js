//Property details (title, description, price, owner, etc.).
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,
    description: String,
    location: String,
    price: Number,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
    rejectionReason: {
      type: String,
      default: null
    },

  },
  { timestamps: true }
);

// Add indexes for better query performance
propertySchema.index({ owner_id: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ location: 1 });

export default mongoose.model("Property", propertySchema);
