const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  } else {
    // If the user is found, we generate a jwt token with a payload
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "48h",
    });

    // send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.PASSWORD_APP_EMAIL },
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
            <p>Click on the following link or copy and paste it into your browser to reset your password:</p>
            <a href="https://247-cleaning.vercel.app/reset-password/${token}">https://247-cleaning.vercel.app/reset-password/${token}</a>
            <p>The link will expire in 48 hours.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent." });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // verify token sent by user
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // find the user with the id from the token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user's password
    user.password = hashedPassword;
    await user.save();

    // send success message
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token provided." });
    }
    return res.status(500).json({ message: error.message });
  }
});

module.exports = { forgotPassword, resetPassword };
