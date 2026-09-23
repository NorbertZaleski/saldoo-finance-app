import express from "express";
import {getTransactions} from "../controllers/transaction.controller.js"

const router = express.Router();

//middleware auth
//router.use(protect);

router.get("/", getTransactions);

export default router;