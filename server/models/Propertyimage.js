//PropertyImage.model.js – Images for properties.
import mongoose from "mongoose";

const propertyImageSchema = new mongoose.Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PropertyImage", propertyImageSchema);
