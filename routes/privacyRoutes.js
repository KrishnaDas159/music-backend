import express from "express";
import {
  updatePrivacySettings,
  exportUserData,
  deleteAccount
} from "../controllers/privacyController.js";

const router = express.Router();

// PUT /api/privacy - Update privacy settings
router.put("/", updatePrivacySettings);

// GET /api/privacy/export - Export user data
router.get("/export", exportUserData);

// DELETE /api/privacy - Delete account
router.delete("/", deleteAccount);

export default router;
