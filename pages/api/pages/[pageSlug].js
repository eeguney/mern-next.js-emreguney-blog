import dbConnect from "../../../utils/mongo";
import Pages from "../../../models/Pages";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { pageSlug },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const page = await Pages.findOne({ slug: pageSlug });
      if (page) {
        return res.status(200).json(page);
      } else {
        return res.status(400).json({ msg: "This doesnt exist!"});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
