import Notification from "../models/allnotification.js";

// Static User ID for testing (replace with JWT later)
const STATIC_USER_ID = "66cfc39e3f1b1e7a8dfe1234";

// Get all notifications for the user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: STATIC_USER_ID })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark single notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: STATIC_USER_ID },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Error marking as read:", error);
    res.status(500).json({ error: "Failed to mark as read" });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: STATIC_USER_ID, read: false },
      { read: true }
    );
    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all as read:", error);
    res.status(500).json({ error: "Failed to mark all as read" });
  }
};

// Create new notification
export const createNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const newNotification = await Notification.create({
      userId: STATIC_USER_ID,
      message
    });
    res.status(201).json(newNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
};
