import express from "express";
import { createAccount, deleteAccount, getAccounts, updateAccount } from "../controllers/account.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
//router.use(protect);

router.get("/", getAccounts);
router.post("/", createAccount)
router.patch("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;