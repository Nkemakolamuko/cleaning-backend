const asyncHandler = require("express-async-handler"); // Install express-async-handler
const bcrypt = require("bcrypt"); // install bcrypt
const jwt = require("jsonwebtoken"); // install jsonwebtoken
const User = require("../models/user.model");

// @desc Register a user
// @route POST /api/users/register  -- I'd probably use a hosted url endpoint
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "None of the fields should be empty." });
    // throw new Error("The fields can not be empty!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    // throw new Error("User already registered!");
    res.status(400).json({ message: "User already registered." });
  }

  // Hash password using bcrypt first before sending the registered data to database
  const hashedPassword = await bcrypt.hash(password, 10);
  // Creating a user with the model after hashing password
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res
      .status(201)
      .json({ _id: user.id, email: user.email, username: user.username });
  } else {
    res.status(400).json({ message: "Invalid user data!" });
    // throw new Error("Invalid user data !");
  }
});

// @desc Login a user
// @route POST /api/users/login  -- I'd probably use a hosted url endpoint
// @access public
const loginUser = asyncHandler(async (req, res) => {
  // We will use JWT here
  // When the user provides login details, we will match it with the one in db and return a jwt if it's successful
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.json({ message: "All fields are required!" });
    // throw new Error("All fields are required!");
  }

  // We will need to find the user in our db that match this provided info then return that user
  const user = await User.findOne({ email });
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username, // this user object is our jwt payload
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" } // can be adjusted
    );
    res.status(200).json({ accessToken }); // we can then use the accessToken to access our private routes
  } else {
    res.status(403);
    res.json({ message: "Email or password is not valid!" });
    // throw new Error("Email and password is not valid!");
  }
});

// @desc Get a user information
// @route POST /api/users/current  -- I'd probably use a hosted url endpoint
// @access private
const currentUser = asyncHandler(async (req, res) => {
  // wE APPENDED THIS IN THE VALIDATE TOKEN
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
