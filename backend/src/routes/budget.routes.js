import express from "express";
import {createBudget, getBudgets} from "../controllers/budget.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

//middleware auth
//router.use(protect);

router.get("/", getBudgets);
router.post("/", createBudget);
router.put("/:id", );
router.delete("/:id", );

export default router;