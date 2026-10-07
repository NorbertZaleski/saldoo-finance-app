import express from "express";
import { createuser, getUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

//middleware auth
//router.use(protect);

router.get("/:id", getUser);
router.post("/", createuser);
router.put("/:id", );
router.delete("/:id", );

export default router;