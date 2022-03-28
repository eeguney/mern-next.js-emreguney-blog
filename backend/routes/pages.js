import express from "express";
// controller imports
import {
  getAllPages,
  addPages,
  getAPageBySlug,
  deleteAPageBySlug,
  updateAPage,
} from "../controllers/pagesController.js";

import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// routers
router.get("/", getAllPages);
router.post("/", verifyToken, addPages);
router.get("/:pageSlug", getAPageBySlug);
router.delete("/:pageSlug", verifyToken, deleteAPageBySlug);
router.put("/", verifyToken, updateAPage);

export default router;
