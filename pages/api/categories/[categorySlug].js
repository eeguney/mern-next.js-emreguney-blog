import dbConnect from "../../../utils/mongo";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { categorySlug },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const category = await Category.findOne({ slug: categorySlug });
      if (category) {
        return res.status(200).json(category);
      } else {
        return res.status(400).json({ msg: "This doesnt exist!"});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
