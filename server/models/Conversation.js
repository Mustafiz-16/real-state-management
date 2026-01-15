//Chat threads between users.
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
