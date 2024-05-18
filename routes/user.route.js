const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateCurrentUser,
} = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser); // The validate token is for the protected routes
router.put("/current/:id", validateToken, updateCurrentUser); // The validate token is for the protected routes

module.exports = router;
