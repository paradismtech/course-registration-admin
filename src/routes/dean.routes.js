import express from "express";
import {
  createFaculty,
  createDepartment,
  createProgramme,
  getHods,
  getDepartments,
  assignHOD,
  getStructure
} from "../controllers/dean.controller.js";

import { protect, authorize } from "../middleware/middleware.js";

const DeanRouter = express.Router();

DeanRouter.post("/faculty", protect, authorize("DEAN"), createFaculty);
DeanRouter.post("/department", protect, authorize("DEAN"), createDepartment);
DeanRouter.post("/programme", protect, authorize("DEAN"), createProgramme);
DeanRouter.get("/departments",protect,authorize("DEAN"),getDepartments);
DeanRouter.get("/hods", protect,authorize("DEAN"),getHods);
DeanRouter.post("/assign-hod", protect, authorize("DEAN"), assignHOD);
DeanRouter.get("/structure", protect, authorize("DEAN"), getStructure);

export default DeanRouter;