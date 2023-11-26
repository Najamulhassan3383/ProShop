import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Products from "../models/productModel.js";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
