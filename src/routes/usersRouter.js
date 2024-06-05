import express from "express";
import { getLoggedInUserId } from "../controllers/usersController.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/", protectRoute, getLoggedInUserId);

export default router;
