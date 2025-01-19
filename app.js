import express from "express";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoomRoutes from "./routes/chatRoomRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";

import cors from "cors";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// Correct the method to set the view engine
app.set("view engine", "ejs"); // Changed from "view-engine" to "view engine"

app.use(express.static("public"));
app.use(userRoutes);
app.use(messageRoutes);
app.use(chatRoomRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  const username = req.user ? req.user.username : "gest";
  console.log(req.body);
  res.render("dashboard", { username });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
export default app;
