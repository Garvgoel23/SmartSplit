import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import groupRoutes from "./routes/group.routes.js";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/api/groups", groupRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is operational" });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

startServer();
