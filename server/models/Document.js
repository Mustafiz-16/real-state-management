//– Uploaded documents,ID proofs or property papers.
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },

    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    documentType: {
      type: String,
      enum: ["NID", "Deed", "FloorPlan", "Other"],
    },

    fileUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
