import express from "express";
import { getUser } from "../controllers/user.controller.js";

const router = express.Router();

//middleware auth
//router.use(protect);

router.get("/:id", getUser);
router.post("/", );
router.put("/:id", );
router.delete("/:id", );

export default router;