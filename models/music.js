import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,

  // Actual MP3 file stored as binary (Buffer)
  musicFile: Buffer,
  musicFileType: String, // e.g., 'audio/mp3'

  // Actual thumbnail file stored as binary (JPG/PDF)
  thumbnailFile: Buffer,
  thumbnailFileType: String, // e.g., 'image/jpeg' or 'application/pdf'

  tokenized: Boolean,
  tokenAddress: String,
  tokenSupply: Number,
  creatorAddress: String,
  revenueSplit: Object,
  transactionHash: String,
  mintedAt: Date,
}, { timestamps: true });

export default mongoose.model("Music", musicSchema);





// import mongoose from "mongoose";

// const musicSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   genre: String,
//   musicFile: String,
//   thumbnail: String,
//   tokenized: Boolean,
//   tokenAddress: String,
//   tokenSupply: Number,
//   creatorAddress: String,
//   revenueSplit: Object,
//   transactionHash: String,
//   mintedAt: Date,
// }, { timestamps: true });

// export default mongoose.model("Music", musicSchema);
