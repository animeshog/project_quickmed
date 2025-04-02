import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  symptoms: [
    {
      type: String,
      required: true,
    },
  ],
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: String,
  medications: String,
  homeRemedies: String,
  fileAnalysis: String,
});

export default mongoose.model("History", historySchema);
