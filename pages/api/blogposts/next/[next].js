import dbConnect from "../../../../utils/mongo";
import BlogPost from "../../../../models/BlogPost";

export default async function handler(req, res) {
  const {
    method,
    query: { next },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const nextPost = await BlogPost.find({ _id: { $gt: next } })
        .sort({ _id: 1 })
        .limit(1);
      if (nextPost) {
        return res.status(200).json(nextPost);
      } else {
        return res.status(400).json("This doesnt exist!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
