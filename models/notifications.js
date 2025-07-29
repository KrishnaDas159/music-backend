import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  displayName: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: "" },
  notifications: {
    vault: { type: Boolean, default: true },
    dao: { type: Boolean, default: true },
    price: { type: Boolean, default: false },
    marketing: { type: Boolean, default: false }
  }
});

export default mongoose.model("Notification", UserSchema);
