import asyncHandler from "../middleware/asyncHandler.js";
import Products from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.send(products);
});

const getProductById = asyncHandler(async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  const product = await Products.findById(req.params.id); // Add 'await' here

  if (product) {
    return res.send(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById };
