import dbConnect from "../../../utils/mongo";
import BlogPost from "../../../models/BlogPost";
import slugger from "../../../utils/slugger";

export default async function handler(req, res) {
  const { method, cookies } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const posts = await BlogPost.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    let { title, excerpt, slug, category, text, tags, thumbnail, author } =
      req.body;
      console.log(title)
    try {
      if (!title || !category || !text) {
        return res.status(400).json("Please fill in all fields.");
      } else {
        if (!slug) {
          slug = slugger(title);
        }
        const isSlugExist = await BlogPost.findOne({ slug });
        if (isSlugExist) {
          const random = Math.floor(Math.random() * 100000);
          slug = `${slug}-${random}`;
        }

        const newPost = BlogPost({
          title,
          excerpt,
          slug,
          category,
          text,
          tags,
          thumbnail,
          author,
        });
        await newPost.save();
        return res.json("Post successfully created.");
      }
    } catch (err) {
      return res.status(500).json("Something went wrong");
    }
  }
}
