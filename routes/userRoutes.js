import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = Router();

router.post("/api/v1/login", loginUser);
router.post("/api/v1/register", registerUser);

export default router;
