import express from "express"
import accountRoutes from "./account.routes.js"
import budgetRoutes from "./budget.routes.js";
import educationRoutes from "./education.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use("/accounts", protect, accountRoutes);
router.use("/budget", protect, budgetRoutes);
router.use("/education", protect, educationRoutes);
router.use("/user", protect, userRoutes);
router.use("/category", protect, categoryRoutes)

export default router;