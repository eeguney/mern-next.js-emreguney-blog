import express from "express";
// controller imports
import {
  getAllComments,
  addComment,
  getACommentBySlug,
  deleteACommentBySlug,
  getCommentsCount,
} from "../controllers/commentsController.js";

import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// routers
router.get("/", getAllComments);
router.post("/", verifyToken, addComment);
router.get("/:postID", getACommentBySlug);
router.delete("/:postID", verifyToken, deleteACommentBySlug);
router.get("/count/:postID", getCommentsCount);

export default router;
