import Settings from "../models/Settings.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateSettings = async (req, res) => {
  let { author, postperpage, authorinfo, github, twitter, email } = req.body;
  try {
    await Settings.updateOne(
      {},
      { $set: { author, postperpage, authorinfo, github, twitter, email } },
      { upsert: true }
    );

    res.status(200).json({ postperpage, authorinfo, github, twitter, email });
  } catch (err) {
    res.status(500).json(err);
  }
};
