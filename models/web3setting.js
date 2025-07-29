import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  displayName: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: "" },

  web3Settings: {
    defaultNetwork: { type: String, default: "sui" },
    preferredYieldProtocol: { type: String, default: "cetus" },
    gasLimit: { type: Number, default: 21000 },
    slippageTolerance: { type: Number, default: 0.5 }
  }
});

export default mongoose.model("Webvault", UserSchema);
