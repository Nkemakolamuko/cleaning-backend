const asyncHandler = require("express-async-handler"); // Install express-async-handler --which allows us to avoid the unnecessary try-catch block
const Product = require("../models/product.model");

// Controllers

// Get all products
const getProducts = async (req, res) => {
  try {
    // const products = await Product.find({});
    const products = await Product.find({ user_id: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send or create product
const createProduct = async (req, res) => {
  // Saving data to mongoDb using our model
  try {
    const { name, quantity, price, image } = req.body;
    if (!name || !quantity || !price) {
      res
        .status(400)
        .json({ message: "The non-optional fields are required!" });
      // throw new Error("The non-optional fields are required!");
    }
    const product = await Product.create({
      name,
      quantity,
      price,
      image,
      user_id: req.user.id, //The CRUD will be for the ID of the authorized user
    });
    // const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update A Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // const product = await Product.findIdAndUpdate(id);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found." });
    }

    // const updatedProduct = await Product.findById(id);

    // A check for a user trying to update another users products
    if (product.user_id.toString() !== req.user.id) {
      res.status(403).json({
        message: "You don't have permission to update other users products!",
      });
      // throw new Error(
      //   "You don't have permission to update other users products!"
      // );
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete A Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // const product = await Product.findByIdAndDelete(id);
    const product = await Product.findById(id);

    // A check for a user trying to update another users products
    if (product.user_id.toString() !== req.user.id) {
      res.status(403).json({
        message: "You don't have permission to delete other users products!",
      });
      // throw new Error(
      //   "You don't have permission to delete other users products!"
      // );
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    await Product.findByIdAndDelete(id);
    // await Product.remove() - will clear all products for this user

    res.status(200).json({ message: product + " deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
