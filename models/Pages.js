import mongoose from "mongoose";

const PagesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be empty."],
      maxlength: 60,
      unique: true,
    },
    text: {
        type: String,
        required: [true, "Text cannot be empty."],
        minlength: 10,
      },
    slug: {
        type: String,
        required: [true, "Slug cannot be empty."],
        maxlength: 60,
        unique: true,
      },
  },
  { timestamps: true }
);

export default mongoose.models.Pages ||
  mongoose.model("Pages", PagesSchema);
