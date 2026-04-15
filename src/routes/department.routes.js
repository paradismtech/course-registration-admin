import express from "express";

const departmentRoutes = express.Router();

departmentRoutes.get("/", (req, res) => res.send("Get all department"));
departmentRoutes.post("/", (req, res) => res.send("Add department"));
departmentRoutes.put("/:id", (req, res) => res.send("Update department"));
departmentRoutes.delete("/:id", (req, res) => res.send("Delete department"));

export default departmentRoutes;