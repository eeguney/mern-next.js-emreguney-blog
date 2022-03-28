import express from "express";
// controller imports
import { upload } from "../controllers/uploadController.js";

import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// routers
router.post("/", verifyToken, upload);

export default router;
