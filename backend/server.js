import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // replace with the origin of your React app
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.cookie("jwt", "your_token_here", {
    maxAge: 2592000000, // 30 days in milliseconds
    httpOnly: true,
    sameSite: "Strict",
  });
  res.send("Cookie set successfully");
});
// app.get("/", (req, res) => {

//   res.send("Cookie set successfully");
// });
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
