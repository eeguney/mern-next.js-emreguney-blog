import dbConnect from "../../../../utils/mongo";
import BlogPost from "../../../../models/BlogPost";

export default async function handler(req, res) {
  const {
    method,
    query: { categorySlug },
  } = req;


  dbConnect();

  if (method === "GET") {
    try {
      const post = await BlogPost.find({ category: categorySlug });
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(400).json("This doesnt exist!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
