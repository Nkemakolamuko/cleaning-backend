const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/product.controller.js");
const validateToken = require("../middleware/validateTokenHandler.js");

// An easier way to make the routes protected by using the validate token
router.use(validateToken);
// On each route, what do wanna do -remember there's a base route in the index file
router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
