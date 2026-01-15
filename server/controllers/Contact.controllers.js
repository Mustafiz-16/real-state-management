// controllers/contact.controllers.js
import ContactMessage from "../models/ContactMessage.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const contact = await ContactMessage.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
