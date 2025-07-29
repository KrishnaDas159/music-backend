import User from "../models/notifications.js";


export const getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


export const updateNotifications = async (req, res) => {
  try {
    const { vault, dao, price, marketing } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { notifications: { vault, dao, price, marketing } },
      { new: true }
    );

    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
