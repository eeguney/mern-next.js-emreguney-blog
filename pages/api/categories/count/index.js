import dbConnect from "../../../../utils/mongo";
import Category from "../../../../models/category";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const categorySize = await Category.find().count();
      res.status(200).json({ count: categorySize });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
