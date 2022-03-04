import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    postperpage: {
      type: Number,
      default: 15,
    },
    author: {
      type: String,
      maxlength: 60,
    },
    authorinfo: {
      type: String,
      minlength: 10,
    },
    github: {
      type: String,
      maxlength: 60,
    },
    twitter: {
      type: String,
      maxlength: 60,
    },
    email: {
      type: String,
      maxlength: 60,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema);
