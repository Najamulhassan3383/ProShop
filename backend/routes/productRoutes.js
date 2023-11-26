import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Products from "../models/productModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.send(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id); // Add 'await' here

    if (product) {
      return res.send(product);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  })
);

export default router;
