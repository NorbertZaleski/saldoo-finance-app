import express from "express";
import { createAccount, deleteAccount, getAccounts, updateAccount } from "../controllers/account.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
//router.use(protect);

router.get("/", getAccounts);
router.patch("/", createAccount)
router.get("/:id", updateAccount);
router.get("/:id", deleteAccount);

export default router;