import express from "express";
// controller imports
import { signin } from "../controllers/loginController.js";

const router = express.Router();

// routers
router.post("/", signin);

export default router;
