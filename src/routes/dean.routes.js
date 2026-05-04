import express from "express";
import {
  createFaculty,
  createDepartment,
  createProgramme,
  assignHOD
} from "../controllers/dean.controller.js";

import { protect, authorize } from "../middleware/middleware.js";

const DeanRouter = express.Router();

DeanRouter.post("/faculty", protect, authorize("DEAN"), createFaculty);
DeanRouter.post("/department", protect, authorize("DEAN"), createDepartment);
DeanRouter.post("/programme", protect, authorize("DEAN"), createProgramme);
DeanRouter.post("/assign-hod", protect, authorize("DEAN"), assignHOD);

export default DeanRouter;