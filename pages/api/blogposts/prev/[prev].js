import dbConnect from "../../../../utils/mongo";
import BlogPost from "../../../../models/BlogPost";

export default async function handler(req, res) {
  const {
    method,
    query: { prev },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const prevPost = await BlogPost.find({ _id: { $lt: prev } })
        .sort({ _id: -1 })
        .limit(1);
      if (prevPost) {
        return res.status(200).json(prevPost);
      } else {
        return res.status(400).json("This doesnt exist!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
