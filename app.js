import express from "express";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoomRoutes from "./routes/chatRoomRoutes.js";
import path from "path"

import cors from "cors";

const app = express();


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('views',path.join(__dirname,"views"))

app.use(userRoutes);
app.use(messageRoutes);
app.use(chatRoomRoutes);


app.get("/", (req, res) => {
  res.send("hi");
});

export default app;
