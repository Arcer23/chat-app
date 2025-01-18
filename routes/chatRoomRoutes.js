import { createChatRoom } from "../controllers/chatRoomcontroller.js";
import express from "express"
const router = express.Router();


router.post("/api/v1/chatRoom",createChatRoom)

export default router