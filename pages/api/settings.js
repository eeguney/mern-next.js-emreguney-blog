import dbConnect from "../../utils/mongo";
import Settings from "../../models/Settings";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const settings = await Settings.find();
      res.status(200).json(settings);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    let { author, postperpage, authorinfo, github, twitter, email } = req.body;

    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    } else {
      try {
        await Settings.updateOne(
          {},
          { $set: { author, postperpage, authorinfo, github, twitter, email } },
          { upsert: true }
        );

        res.status(200).json({postperpage, authorinfo, github, twitter, email});
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
}
