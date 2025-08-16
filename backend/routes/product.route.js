// backend/routes/product.route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { createProduct, getProducts, getProduct, searchProducts} from "../controllers/product.controller.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${base}${ext.toLowerCase()}`);
  },
});

// Accept images + .stl/.stp/.step by extension (mimetype can be octet-stream)
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isImage = /^image\//i.test(file.mimetype);
    const ext = path.extname(file.originalname).toLowerCase();
    const isSTL = ext === ".stl";
    const isSTEP = ext === ".stp" || ext === ".step";
    if (isImage || isSTL || isSTEP) return cb(null, true);
    cb(new Error("Only images, .stl, .stp, or .step files are allowed"));
  },
});

/* ===== Routes ===== */

// List + pagination: GET /api/products?limit=48&page=1
router.get("/", getProducts);
router.get("/:id", getProduct);


// Create with files: POST /api/products  (fields: image, model)
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "model", maxCount: 1 },
  ]),
  createProduct
);

export default router;
