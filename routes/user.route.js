const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateCurrentUser,
} = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/forgotPassword");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser); // The validate token is for the protected routes
router.put("/current/:id", validateToken, updateCurrentUser); // The validate token is for the protected routes
// Password Reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
