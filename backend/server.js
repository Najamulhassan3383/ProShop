import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;

import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();
const App = express();
connectDB();

App.use(cors());

App.get("/", (req, res) => {
  res.send("Server is ready");
});

App.use("/api/products", productRoutes);
App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
