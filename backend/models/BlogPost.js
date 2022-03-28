import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be empty."],
      maxlength: 60,
      unique: true,
    },
    excerpt: {
      type: String,
    },
    slug: {
      type: String,
      required: [true, "Slug cannot be empty."],
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    text: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Category cannot be empty."],
    },
    comments: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);
