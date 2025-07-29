import express from "express";
import { getNotifications, updateNotifications } from "../controllers/notificationController.js";

const router = express.Router();

// Middleware to simulate authentication
router.use((req, res, next) => {
  req.userId = "68888b7e830067e6640eea0f"; // Replace with real auth logic
  next();
});

// Routes
router.get("/", getNotifications);
router.put("/", updateNotifications);

export default router;
