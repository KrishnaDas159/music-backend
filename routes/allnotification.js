import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  createNotification
} from "../controllers/allnotification.js";

const router = express.Router();

router.get("/", getNotifications);
router.put("/read/:id", markAsRead);
router.put("/read-all", markAllAsRead);
router.post("/", createNotification);

export default router;
