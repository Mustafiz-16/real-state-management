//Properties that users saved/bookmarked.
import mongoose from "mongoose";

const savedPropertySchema = new mongoose.Schema(
  {
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

// one buyer cannot save same property twice
savedPropertySchema.index({ buyer_id: 1, property_id: 1 }, { unique: true });

export default mongoose.model("SavedProperty", savedPropertySchema);
