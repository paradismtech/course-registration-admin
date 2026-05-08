import express from "express";
import { login } from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", authLimiter, login);

export default AuthRouter;