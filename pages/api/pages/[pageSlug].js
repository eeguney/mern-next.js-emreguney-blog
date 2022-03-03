import dbConnect from "../../../utils/mongo";
import Pages from "../../../models/Pages";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { pageSlug },
  } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    } else {
      try {
        await Pages.findOneAndDelete({ _id: pageSlug });
        res.status(200).json({ msg: "Deleted..." });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  if (method === "GET") {
    try {
      const page = await Pages.findOne({ slug: pageSlug });
      if (page) {
        return res.status(200).json(page);
      } else {
        return res.status(400).json({ msg: "This doesnt exist!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    let { _id, title, slug, text} = req.body;
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    } else {
      try {
        await Pages.findOneAndUpdate(
          { _id: _id },
          { title, slug, text },
          { new: true }
        );
        res.status(200).json({ msg: "Updated..." });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
}
