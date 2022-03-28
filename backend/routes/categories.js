import express from "express";
// controller imports
import {
  getAllCategories,
  addCategory,
  getACategoriesBySlug,
  deleteACategoryBySlug,
  updateACategory,
  getCategoriesCount
} from "../controllers/categoriesController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// routers
router.get("/", getAllCategories);
router.post("/", verifyToken, addCategory);
router.get("/param/:categorySlug", getACategoriesBySlug);
router.delete("/param/:categorySlug", verifyToken, deleteACategoryBySlug);
router.put("/", verifyToken, updateACategory);
router.get("/count", getCategoriesCount);


export default router;
