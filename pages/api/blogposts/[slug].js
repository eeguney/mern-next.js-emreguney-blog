import dbConnect from "../../../utils/mongo";
import BlogPost from "../../../models/BlogPost";
import slugger from "../../../utils/slugger";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { slug },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const post = await BlogPost.findOne({ slug });
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
