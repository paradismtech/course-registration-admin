import express from "express";

const facultyRoutes = express.Router();

facultyRoutes.post("/", (req, res) => res.send("Create new faculty"));
facultyRoutes.get("/", (req, res) => res.send("Get all faculties"));
facultyRoutes.put("/:id", (req, res) => res.send("Update faculty"));
facultyRoutes.delete("/:id", (req, res) => res.send("Delete faculty"));

export default facultyRoutes;