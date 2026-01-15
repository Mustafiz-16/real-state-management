import React, { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../../../../../Api/admindashboard.api";
import "./NotificationsTab.css";

export default function NotificationsTab({ onNotificationRead }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      if (onNotificationRead) onNotificationRead();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      // Call onNotificationRead for each unread notification
      if (onNotificationRead) {
        for (let i = 0; i < unreadCount; i++) {
          onNotificationRead();
        }
      }
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "property_approved":
        return "🎉";
      case "property_rejected":
        return "❌";
      case "price_drop":
        return "💰";
      case "booking":
        return "📅";
      default:
        return "🔔";
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "property_approved":
        return "notification-success";
      case "property_rejected":
        return "notification-error";
      case "price_drop":
        return "notification-info";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="notifications-loading">Loading notifications...</div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notifications-tab">
      <div className="notifications-header">
        <h3>
          Notifications{" "}
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} new</span>
          )}
        </h3>
        {unreadCount > 0 && (
          <button className="mark-all-btn" onClick={handleMarkAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <span className="empty-icon">🔔</span>
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-item ${
                !notification.isRead ? "unread" : ""
              } ${getTypeClass(notification.type)}`}
            >
              <div className="notification-icon">
                {getIcon(notification.type)}
              </div>
              <div className="notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
              <div className="notification-actions">
                {!notification.isRead && (
                  <button
                    className="action-btn read-btn"
                    onClick={() => handleMarkAsRead(notification._id)}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(notification._id)}
                  title="Delete"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
