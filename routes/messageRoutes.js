import express from "express"
import { createMessage } from "../controllers/messageController.js"
const router = express.Router();

router.post("api/v1/sendmessage",createMessage)


export default router