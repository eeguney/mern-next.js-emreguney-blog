import dbConnect from "../../../utils/mongo";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
  const {
    method,
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const comments = await Comment.find()
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}


