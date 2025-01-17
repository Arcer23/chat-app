import mongoose from "mongoose";
import "dotenv/config";
export const connectDB = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("db donnected");
    })
    .catch((error) => {
      console.log("error while connecting",error);
    });
};
