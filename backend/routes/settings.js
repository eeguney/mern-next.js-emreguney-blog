import express from "express";
// controller imports
import { getSettings, updateSettings } from "../controllers/settingController.js";

import verifyToken from "../middlewares/verifyToken.js";


const router = express.Router();

// routers
router.get("/", getSettings);
router.put("/", verifyToken, updateSettings);

export default router;
