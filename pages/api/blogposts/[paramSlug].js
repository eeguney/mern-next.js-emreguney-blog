import dbConnect from "../../../utils/mongo";
import BlogPost from "../../../models/BlogPost";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { paramSlug },
  } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const post = await BlogPost.findOne({ slug: paramSlug });
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(400).json("This doesnt exist!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    } else {
      try {
        await BlogPost.findOneAndDelete({ _id: paramSlug });
        res.status(200).json({ msg: "Deleted..." });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  if (method === "PUT") {
    let { _id, title, slug, category, text, tags, thumbnail } = req.body;
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    } else {
      try {
        await BlogPost.findOneAndUpdate(
          { _id: _id },
          { title, slug, category, text, tags, thumbnail },
          { new: true }
        );
        res.status(200).json({ msg: "Updated..." });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
}
