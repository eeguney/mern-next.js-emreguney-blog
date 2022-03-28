// model imports

import Pages from "../models/Pages.js";
import slugger from "../utils/slugger.js";

export const addPages = async (req, res) => {
    let { title, text, slug } = req.body;

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
  };
  
  export const getAllPages = async (req, res) => {
    try {
        const pages = await Pages.find();
        res.status(200).json(pages);
      } catch (err) {
        res.status(500).json(err);
      }
  };
  
  export const getAPageBySlug = async (req, res) => {
    const pageSlug = req.params.pageSlug;
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
  };
  
  export const deleteAPageBySlug = async (req, res) => {
      const pageSlug = req.params.pageSlug
      try {
        await Pages.findOneAndDelete({ _id: pageSlug });
        res.status(200).json({ msg: "Deleted..." });
      } catch (err) {
        res.status(500).json(err);
      }
  };
  
  export const updateAPage = async (req, res) => {
    let { _id, title, slug, text} = req.body;
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
  };
  