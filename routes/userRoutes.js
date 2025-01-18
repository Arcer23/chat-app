import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.post("/api/v1/login", loginUser);
router.post("/api/v1/register", registerUser);
router.put("/api/v1/update:/id", updateUser);
export default router;
