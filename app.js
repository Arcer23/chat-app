import express from "express";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("hi");
});

export default app;
