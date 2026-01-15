import Notification from "../models/Notification.js";
import SavedProperty from "../models/Saveproperty.js";

export const notifyPriceDrop = async (propertyId, newPrice) => {
  const savedUsers = await SavedProperty.find({ property_id: propertyId });

  for (const s of savedUsers) {
    await Notification.create({
      user_id: s.buyer_id,
      title: "Price Dropped!",
      message: `Property price reduced to ৳${newPrice}`,
      type: "price_drop",
    });
  }
};

/* Get all notifications for logged-in user */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.user.id })
      .populate("property_id", "title")
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications", error: err.message });
  }
};

/* Get unread notification count */
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user_id: req.user.id,
      isRead: false,
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to get count", error: err.message });
  }
};

/* Mark notification as read */
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark as read", error: err.message });
  }
};

/* Mark all notifications as read */
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user_id: req.user.id, isRead: false },
      { isRead: true }
    );
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark all as read", error: err.message });
  }
};

/* Delete a notification */
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};
