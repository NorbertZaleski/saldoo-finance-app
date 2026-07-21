import express from "express"
import accountRoutes from "./account.routes.js"
import budgetRoutes from "./budget.routes.js";
import educationRoutes from "./education.routes.js";

const router = express.Router();

router.use("/account", accountRoutes);
router.use("/budget", budgetRoutes);
router.use("/education", educationRoutes);

export default router;