import express from "express";
import cors from "cors";
import { config } from "dotenv";

// Importing routes
import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import DeanRouter from "./routes/dean.routes.js";
import HodRouter from "./routes/hod.routes.js";
import StudentRouter from "./routes/student.routes.js";

config()

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true
}));

// Health check endpoint enable on local development only
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Basic route for testing
app.get("/", (req, res) => res.json({ status: "ok", service: "course-registration-backend" }));

// Api routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/dean", DeanRouter);
app.use("/api/hod", HodRouter);
app.use("/api/student", StudentRouter);
