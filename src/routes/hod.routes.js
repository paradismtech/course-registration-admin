import express from "express";
import { addCourse, getCourses, getRegistrations,
  updateRegistration } from "../controllers/hod.controller.js";
import { protect, authorize } from "../middleware/middleware.js";

const HodRouter = express.Router();

HodRouter.post("/course", protect, authorize("HOD"), addCourse);

HodRouter.get("/courses", protect, authorize("HOD"), getCourses);

HodRouter.get(
  "/registrations",
  protect,
  authorize("HOD"),
  getRegistrations
);

HodRouter.put(
  "/registrations",
  protect,
  authorize("HOD"),
  updateRegistration
);

export default HodRouter;