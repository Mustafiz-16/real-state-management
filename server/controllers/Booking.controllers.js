import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    if (!req.body.propertyId || !req.body.date) {
      return res.status(400).json({ message: "propertyId and date are required" });
    }

    const booking = await Booking.create({
      property_id: req.body.propertyId,
      buyer_id: req.user.id,
      bookingDate: req.body.date,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    if (!req.body.status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Buyer requests → Owner approves