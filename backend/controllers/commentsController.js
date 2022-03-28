// model imports

import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
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
      const findPostWithID = await BlogPost.findOne({
        _id: postID,
      });
      await BlogPost.findOneAndUpdate(
        { _id: postID },
        {
          comments: findPostWithID.comments + 1,
        },
        { new: true }
      );
      const resComment = await newComment.save();
      return res.json(resComment);
    }
  } catch (err) {
    return res.status(500).json("Something went wrong");
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getACommentBySlug = async (req, res) => {
  const postID = req.params.postID;
  try {
    const comments = await Comment.find({ _id: postID });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteACommentBySlug = async (req, res) => {
  const postID = req.params.postID;
  try {
    await Comment.findOneAndDelete({ _id: postID });
    res.status(200).json({ msg: "Deleted..." });
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getCommentsCount = async (req, res) => {
  const postID = req.params.postID;
  try {
    const commentSize = await Comment.find({ postID }).count();
    res.status(200).json({ count: commentSize });
  } catch (err) {
    res.status(500).json(err);
  }
};
