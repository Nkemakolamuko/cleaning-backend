const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, address, phoneNumber } = req.body;

  if (!username || !email || !password || !address || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "None of the fields should be empty." });
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return res.status(400).json({ message: "User already registered." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    address,
    phoneNumber,
  });

  if (user) {
    return res.status(201).json({
      _id: user.id,
      email: user.email,
      username: user.username,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
  } else {
    return res.status(400).json({ message: "Invalid user data!" });
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Below is what I'm passing to the jwt payload -phew
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          address: user.address,
          phoneNumber: user.phoneNumber,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300m" }
    );
    return res.status(200).json({ accessToken });
  } else {
    return res.status(403).json({ message: "Email or password is not valid!" });
  }
});

// @desc Get a user information
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc Update a user information
// @route PUT /api/users/current/:id
// @access private
const updateCurrentUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  if (user.id.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You don't have permission to update other users' details!",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

module.exports = { registerUser, loginUser, currentUser, updateCurrentUser };
