import dbConnect from "../../../../utils/mongo";
import Comment from "../../../../models/Comment";

export default async function handler(req, res) {
  const {
    method,
    query: { postID },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const commentSize = await Comment.find({ postID }).count()
      res.status(200).json({ count: commentSize });
    } catch (err) {
      res.status(500).json(err);
    }
  }


}


