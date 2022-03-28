// model imports

import Category from "../models/category.js";
import slugger from "../utils/slugger.js";

export const addCategory = async (req, res) => {
    let { title, slug } = req.body;

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
        const newCategory = Category({
          title,
          slug,
        });
        await newCategory.save();
        return res.json("Category successfully created.");
      }
    } catch (err) {
      return res.status(500).json("Something went wrong");
    }
  };
  
  export const getAllCategories = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
      } catch (err) {
        res.status(500).json(err);
      }
  };
  
  export const getACategoriesBySlug = async (req, res) => {
    const categorySlug = req.params.categorySlug;
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
  };
  
  export const deleteACategoryBySlug = async (req, res) => {
      const categorySlug = req.params.categorySlug
    try {
        await Category.findOneAndDelete({ _id: categorySlug });
        res.status(200).json({ msg: "Deleted..." });
      } catch (err) {
        res.status(500).json(err);
      }
  };
  
  export const updateACategory = async (req, res) => {
    let { _id, title, slug } = req.body;
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
  };
  

  export const getCategoriesCount = async (req, res) => {
    try {
        const categorySize = await Category.find().count();
        res.status(200).json({ count: categorySize });
      } catch (err) {
        res.status(500).json(err);
      }
  };
  
  