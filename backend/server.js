import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;
import products from "./data/products.js";
import cors from "cors";

dotenv.config();
const App = express();
connectDB();

App.use(cors());

App.get("/", (req, res) => {
  res.send("Server is ready");
});

App.get("/api/products", (req, res) => {
  res.send(products);
});

App.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});
App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
