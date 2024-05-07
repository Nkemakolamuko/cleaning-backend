// We need to validate the token
const asyncHandler = require("express-async-handler"); // Install express-async-handler
const jwt = require("jsonwebtoken"); // install jsonwebtoken

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization; // The token is expected to come from here, so we'd pass it in the frontend
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]; // Split where there's a whitespace and return item at index 1 which is the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized!");
      }
      req.user = decoded.user; // we verified the token and extracted it, then append it to the req.user
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error(
        "User is not authorized or token is missing in the header"
      );
    }
  }
});

module.exports = validateToken;
