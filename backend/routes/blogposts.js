import express from "express";
// controller imports
import {
  getAllPosts,
  addPost,
  getAPostBySlug,
  deleteAPostBySlug,
  updateAPost,
  getPrevPost,
  getNextPost,
  getPostsCount,
  getPostByCategorySlug
} from "../controllers/blogpostsController.js";
import verifyToken from "./../middlewares/verifyToken.js"

const router = express.Router();

// routers
router.get("/", getAllPosts);
router.post("/", verifyToken, addPost);
router.get("/param/:paramSlug", getAPostBySlug);
router.delete("/param/:paramSlug", verifyToken, deleteAPostBySlug);
router.put("/", verifyToken, updateAPost);
router.get("/prev/:prev", getPrevPost);
router.get("/next/:next", getNextPost);
router.get("/count", getPostsCount);
router.get("/category/:categorySlug", getPostByCategorySlug);

export default router;
