import express from "express";
import { deleteAccount, getAccount, updateAccount } from "../controllers/account.controller.js"

const router = express.Router();

router.get("/:id", getAccount);
router.get("/:id", updateAccount);
router.get("/:id", deleteAccount);

export default router;