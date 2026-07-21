import express from "express"
import accountRoutes from "./account.routes.js"
import budgetRoutes from "./budget.routes.js";

const router = express.Router();

router.use("/account", accountRoutes);
router.use("/budget", budgetRoutes);

export default router;