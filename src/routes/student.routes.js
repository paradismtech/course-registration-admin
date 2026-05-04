import express from "express";
import {
  getAvailableCourses,
  submitRegistration,
  myRegistration,
} from "../controllers/student.controller.js";

import { protect, authorize } from "../middleware/middleware.js";

const StudentRouter = express.Router();

StudentRouter.get(
  "/courses",
  protect,
  authorize("STUDENT"),
  getAvailableCourses
);

StudentRouter.post(
  "/register",
  protect,
  authorize("STUDENT"),
  submitRegistration
);

StudentRouter.get(
  "/my-registration",
  protect,
  authorize("STUDENT"),
  myRegistration
);

export default StudentRouter;