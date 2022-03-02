import dbConnect from "../../../utils/mongo";
import Category from "../../../models/Category";
import slugger from "../../../utils/slugger";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const category = await Category.find();
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    let slug;
    let { title } = req.body;
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      if (!title) {
        return res.status(400).json("Please fill in all fields.");
      } else {
        if (!slug) {
          slug = slugger(title);
        }
        const isSlugExist = await Category.findOne({ slug });
        if (isSlugExist) {
          const random = Math.floor(Math.random() * 100000);
          slug = `${slug}-${random}`;
        }
        const newCategory = Pages({
          title,
          slug,
        });
        await newCategory.save();
        return res.json("Category successfully created.");
      }
    } catch (err) {
      return res.status(500).json("Something went wrong");
    }
  }
}
