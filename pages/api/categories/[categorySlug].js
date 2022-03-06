import dbConnect from "../../../utils/mongo";
import Category from "../../../models/category";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { categorySlug },
  } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    } else {
      try {
        await Category.findOneAndDelete({ _id: categorySlug });
        res.status(200).json({ msg: "Deleted..." });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  if (method === "GET") {
    try {
      const category = await Category.findOne({ slug: categorySlug });
      if (category) {
        return res.status(200).json(category);
      } else {
        return res.status(400).json({ msg: "This doesnt exist!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    let { _id, title, slug } = req.body;
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    } else {
      try {
        await Category.findOneAndUpdate(
          { _id: _id },
          { title, slug },
          { new: true }
        );
        res.status(200).json({ msg: "Updated..." });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

}
