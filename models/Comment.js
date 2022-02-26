import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      required: [true, "Post ID cannot be empty."],
    },
    parentID: {
      type: String,
      default: null
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty."],
      maxlength: 50,
    },
    fullname: {
      type: String,
      required: [true, "Name cannot be empty."],
      maxlength: 40,
    },
    imageUrl: {
      type: String,
      default: "https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg"
    },
    comment: {
      type: String,
      required: [true, "Comment text cannot be empty."],
      maxlength: 250,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    responseCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
