import API from "./axios";

export const getPendingProperties = () =>
  API.get("/admin/properties/pending");

export const approveProperty = (id) =>
  API.patch(`/admin/properties/${id}/approve`);

export const rejectProperty = (id, reason) =>
  API.patch(`/admin/properties/${id}/reject`, { reason });

// Notification APIs
export const getNotifications = () =>
  API.get("/notifications");

export const getUnreadNotificationCount = () =>
  API.get("/notifications/unread-count");

export const markNotificationAsRead = (id) =>
  API.patch(`/notifications/${id}/read`);

export const markAllNotificationsAsRead = () =>
  API.patch("/notifications/read-all");

export const deleteNotification = (id) =>
  API.delete(`/notifications/${id}`);

