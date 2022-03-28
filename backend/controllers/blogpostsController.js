// model imports

import BlogPost from "../models/BlogPost.js";
import slugger from "../utils/slugger.js";

export const addPost = async (req, res) => {
  let { title, excerpt, slug, category, text, tags, thumbnail } = req.body;
  try {
    if (!title || !category || !text) {
      return res.status(400).json("Please fill in all fields.");
    } else {
      if (!slug) {
        slug = slugger(title);
      }
      const isSlugExist = await BlogPost.findOne({ slug });
      if (isSlugExist) {
        const random = Math.floor(Math.random() * 100000);
        slug = `${slug}-${random}`;
      }

      const newPost = BlogPost({
        title,
        excerpt,
        slug,
        category,
        text,
        tags,
        thumbnail,
        author,
      });
      await newPost.save();
      return res.json("Post successfully created.");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(200).json({});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAPostBySlug = async (req, res) => {
  const paramSlug = req.params.paramSlug;
  try {
    const post = await BlogPost.findOne({ slug: paramSlug });
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(400).json("This doesnt exist!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteAPostBySlug = async (req, res) => {
  const paramSlug = req.params.paramSlug
  try {
    await BlogPost.findOneAndDelete({ _id: paramSlug });
    res.status(200).json({ msg: "Deleted..." });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateAPost = async (req, res) => {
  let { _id, title, slug, category, text, tags, thumbnail } = req.body;
    try {
      await BlogPost.findOneAndUpdate(
        { _id: _id },
        { title, slug, category, text, tags, thumbnail },
        { new: true }
      );
      res.status(200).json({ msg: "Updated..." });
    } catch (err) {
      res.status(500).json(err);
    }
};

export const getPrevPost = async (req, res) => {

  const prev = req.params.prev
  try {
    const prevPost = await BlogPost.find({ _id: { $lt: prev } })
      .sort({ _id: -1 })
      .limit(1);
    if (prevPost) {
      return res.status(200).json(prevPost);
    } else {
      return res.status(400).json("This doesnt exist!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getNextPost = async (req, res) => {

  const next = req.params.next
  try {
    const nextPost = await BlogPost.find({ _id: { $gt: next } })
    .sort({ _id: 1 })
    .limit(1);
  if (nextPost) {
    return res.status(200).json(nextPost);
  } else {
    return res.status(400).json("This doesnt exist!");
  }
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getPostsCount = async (req, res) => {
  try {
    const postSize = await BlogPost.find().count();
    res.status(200).json({ count: postSize });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPostByCategorySlug = async (req, res) => {
  const categorySlug = req.params.categorySlug
  try {
    const post = await BlogPost.find({ category: categorySlug });
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(400).json("This doesnt exist!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
