// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  bio: String,
  privacy: {
    publicProfile: { type: Boolean, default: true },
    anonymousAnalytics: { type: Boolean, default: true }
  },
  password: String // hashed password
}, { timestamps: true });

export default mongoose.model("Privacy", UserSchema);
