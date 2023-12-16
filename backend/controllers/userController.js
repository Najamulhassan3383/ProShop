import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
const { setCookie } = "cookie"; // Import the setCookie function from the cookie package
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      maxAge: 2592000000, // 30 days in milliseconds
      httpOnly: true,
      sameSite: "none",
      secure: true, // set to true if not in development mode
      path: "/",
    });

    // Set the cookie with the generated token

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  // console.log(userExists.email, userExists.name);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //otherwise create user
  const user = await User.create({
    name,
    email,
    password,
  });
  //if user is created
  const token = generateToken(user._id);
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // Set the cookie expiration time
  };
  setCookie(res, "jwt", token, cookieOptions); // Set the cookie with the generated token

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get users
// @route   GET /api/users/
// @access  Private/admin
//admin route to get all the users

const getUsers = asyncHandler(async (req, res) => {
  console.log("get users");
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/admin
//admin route to get single users

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
//admin route to delete the users

const deleteUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    UPDATE users
// @route   PUT /api/users/:ID
// @access  Private/ADMIN
//admin route to update the users

const updateUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
