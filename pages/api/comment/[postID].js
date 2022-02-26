import dbConnect from "../../../utils/mongo";
import Comment from "../../../models/Comment";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const {
    method,
    query: { postID },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const comments = await Comment.find({ postID });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    let { parentID, email, fullname, imageUrl, comment } = req.body;
    try {
      if (!postID || !email || !fullname || !comment) {
        return res.status(400).json("Please fill in all fields.");
      } else {
        const newComment = Comment({
          postID,
          parentID,
          email,
          fullname,
          imageUrl,
          comment,
        });
        const resComment = await newComment.save();
        return res.json(resComment);
      }
    } catch (err) {
      return res.status(500).json("Something went wrong");
    }
  }

}
