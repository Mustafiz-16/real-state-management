// routes/contact.routes.js
import express from "express";
import { submitContactForm } from "../controllers/Contact.controllers.js";

const router = express.Router();

router.post("/", submitContactForm);

export default router;
