import dbConnect from "../../../../utils/mongo";
import BlogPost from "../../../../models/BlogPost";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const postSize = await BlogPost.find().count();
      res.status(200).json({ count: postSize });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
