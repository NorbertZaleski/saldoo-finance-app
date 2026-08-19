import express from "express"
import accountRoutes from "./account.routes.js"
import budgetRoutes from "./budget.routes.js";
import educationRoutes from "./education.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use("/account", accountRoutes);
router.use("/budget", budgetRoutes);
router.use("/education", educationRoutes);
router.use("/user", userRoutes);

export default router;