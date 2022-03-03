import dbConnect from "../../../utils/mongo";
import Comment from "../../../models/Comment";
import BlogPost from "../../../models/BlogPost";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { postID },
  } = req;

  const token = cookies.token;

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
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
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
        const findPostWithID = await BlogPost.findOne({
          _id: postID,
        });
          await BlogPost.findOneAndUpdate(
            { _id: postID },
            {
              comments: findPostWithID.comments + 1
            },
            { new: true }
          );
        const resComment = await newComment.save();
        return res.json(resComment);
      }
    } catch (err) {
      return res.status(500).json("Something went wrong");
    }
  }
}
