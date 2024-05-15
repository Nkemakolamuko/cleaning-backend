const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username!"],
      unique: false,
    },

    email: {
      type: String,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email taken"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },
    address: {
      type: String,
      required: false,
      unique: false,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: [true, "Phone number taken"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model.Users || mongoose.model("User", UserSchema);
module.exports = User;
