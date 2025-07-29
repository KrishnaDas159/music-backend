import User from "../models/privacy.js";

// Static user ID for now
const STATIC_USER_ID = "66cfc39e3f1b1e7a8dfe1234";

/**
 * Update Privacy Settings
 */
export const updatePrivacySettings = async (req, res) => {
  const { publicProfile, anonymousAnalytics } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      STATIC_USER_ID,
      {
        "privacy.publicProfile": publicProfile,
        "privacy.anonymousAnalytics": anonymousAnalytics
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Privacy settings updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating privacy settings:", error);
    res.status(500).json({ error: "Failed to update privacy settings" });
  }
};

/**
 * Export User Data
 */
export const exportUserData = async (req, res) => {
  try {
    const user = await User.findById(STATIC_USER_ID).lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    delete user.password; // Remove sensitive data

    res.setHeader("Content-Disposition", `attachment; filename=user-data.json`);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(user, null, 2));
  } catch (error) {
    console.error("Error exporting user data:", error);
    res.status(500).json({ error: "Failed to export data" });
  }
};

/**
 * Delete Account
 */
export const deleteAccount = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(STATIC_USER_ID);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
};
