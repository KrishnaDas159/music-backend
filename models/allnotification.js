import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String, // Can be ObjectId if you link to User
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Allnotification", notificationSchema);
