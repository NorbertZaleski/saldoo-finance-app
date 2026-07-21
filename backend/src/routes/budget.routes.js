import express from "express";
import {createBudget, deleteBudget, getBudget, updateBudget} from "../controllers/budget.controller.js"

const router = express.Router();

router.get("/", getBudget);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

export default router;