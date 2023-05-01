import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth";
import courses from "./routes/courses";
import passwordResetRoutes from "./routes/passwordReset";
import progress from "./routes/progress";
import userRoutes from "./routes/users";
import connection from "./utils/db";

dotenv.config({ path: "../.env" });

const app = express();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/progress", progress);
app.use("/api/courses", courses);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port: ${port}!`));
