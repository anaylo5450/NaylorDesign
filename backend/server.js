// backend/server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectdb } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import requestRoutes from "./routes/request.route.js";
import assemblyAiRoutes from "./routes/assemblyai.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/products", productRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/assemblyai", assemblyAiRoutes);


app.get("/", (_req, res) => {
  res.send("API is running...");
});




const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

connectdb()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`API on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
