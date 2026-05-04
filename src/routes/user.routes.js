import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/middleware.js";

const UserRouter = express.Router();

UserRouter.get("/profile", protect, getProfile);

export default UserRouter;