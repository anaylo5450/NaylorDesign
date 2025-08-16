import express from "express";
import { submitRequest } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", submitRequest);

export default router;
