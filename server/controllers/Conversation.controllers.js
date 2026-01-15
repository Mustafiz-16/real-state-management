import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res) => {
  try {
    if (!req.body.propertyId || !req.body.ownerId) {
      return res.status(400).json({ message: "propertyId and ownerId are required" });
    }

    // Check if conversation already exists
    const existingConvo = await Conversation.findOne({
      property_id: req.body.propertyId,
      buyer_id: req.user.id,
      owner_id: req.body.ownerId,
    });

    if (existingConvo) {
      // Return existing conversation with populated fields
      const populated = await Conversation.findById(existingConvo._id)
        .populate("property_id", "title location")
        .populate("buyer_id", "name email")
        .populate("owner_id", "name email");
      return res.status(200).json(populated);
    }

    const convo = await Conversation.create({
      property_id: req.body.propertyId,
      buyer_id: req.user.id,
      owner_id: req.body.ownerId,
    });

    const populated = await Conversation.findById(convo._id)
      .populate("property_id", "title location")
      .populate("buyer_id", "name email")
      .populate("owner_id", "name email");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const convos = await Conversation.find({
      $or: [{ buyer_id: req.user.id }, { owner_id: req.user.id }],
    })
      .populate("property_id", "title location")
      .populate("buyer_id", "name email")
      .populate("owner_id", "name email")
      .sort({ updatedAt: -1 });
    res.json(convos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const convo = await Conversation.findById(req.params.id)
      .populate("property_id", "title location")
      .populate("buyer_id", "name email")
      .populate("owner_id", "name email");

    if (!convo) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Verify user is part of conversation
    if (convo.buyer_id._id.toString() !== req.user.id && 
        convo.owner_id._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(convo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};