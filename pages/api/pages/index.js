import dbConnect from "../../../utils/mongo";
import Pages from "../../../models/Pages";
import slugger from "../../../utils/slugger";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const pages = await Pages.find();
      res.status(200).json(pages);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    let slug;
    let { title, text } = req.body;
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      if (!title || !text) {
        return res.status(400).json("Please fill in all fields.");
      } else {
        if (!slug) {
          slug = slugger(title);
        }
        const isSlugExist = await Pages.findOne({ slug });
        if (isSlugExist) {
          const random = Math.floor(Math.random() * 100000);
          slug = `${slug}-${random}`;
        }
        const newPage = Pages({
          title,
          text,
          slug,
        });
        await newPage.save();
        return res.json("Page successfully created.");
      }
    } catch (err) {
      return res.status(500).json("Something went wrong");
    }
  }
}
