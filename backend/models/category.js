import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be empty."],
      maxlength: 60,
      unique: true,
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

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
