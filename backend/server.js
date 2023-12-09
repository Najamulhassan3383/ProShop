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
const App = express();
//body parser middlware
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

//cookie parser middleware
App.use(cookieParser());
connectDB();

App.use(cors());

App.get("/", (req, res) => {
  res.send("Server is ready");
});

App.use("/api/products", productRoutes);
App.use("/api/users", userRoutes);
App.use("/api/orders", orderRoutes);

App.use(notFound);
App.use(errorHandler);
App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
