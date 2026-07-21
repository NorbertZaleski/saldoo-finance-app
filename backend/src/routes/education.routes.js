import express from "express";
import { getEducation } from "../controllers/education.controller.js";

const router = express.Router();

router.get("/", getEducation);

export default router;