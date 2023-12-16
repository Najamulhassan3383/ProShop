import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.log(token);
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//admin middleware
const admin = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    console.log("calling next");
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

export { protect, admin };
