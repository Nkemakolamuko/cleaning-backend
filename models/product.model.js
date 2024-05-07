const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    // We'd need to create an id for the authorized user who is performing CRUD on the products - probably only read
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "please enter a value."],
    },

    reviews: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: false,
    },

    size: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: false,
    },

    category: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    newPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    prevPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    img: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// In the database - the "Product" will have a prefixed 's' , and it will be all lowercase"
const Product =
  mongoose.model.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;

// Ctrl + I to activate codeium
