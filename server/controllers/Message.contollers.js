import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";



// export const sendMessage = async (req, res) => {
//   const message = await Message.create({
//     conversation_id: req.body.conversationId,
//     sender_id: req.user.id,
//     text: req.body.text,
//   });

//   await Conversation.findByIdAndUpdate(
//     req.body.conversationId,
//     { lastMessage: req.body.text }
//   );

//   res.status(201).json(message);
// };

//const { conversationId, text } = req.body;

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    if (!conversationId || !text) {
      return res.status(400).json({
        message: "conversationId and text are required",
      });
    }

    const message = await Message.create({
      conversation_id: conversationId,
      sender_id: req.user.id,
      text,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getMessages = async (req, res) => {
  try {
    const msgs = await Message.find({
      conversation_id: req.params.conversationId,
    });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Owner & Buyer messaging
