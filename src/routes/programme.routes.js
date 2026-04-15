import express from "express";

const programmeRoutes = express.Router();

programmeRoutes.get("/", (req, res) => res.send("Get all department"));
programmeRoutes.post("/", (req, res) => res.send("Add department"));
programmeRoutes.put("/:id", (req, res) => res.send("Update department"));
programmeRoutes.delete("/:id", (req, res) => res.send("Delete department"));