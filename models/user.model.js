const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username!"],
      unique: [true, "Username taken"],
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
      required: [false],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model.Users || mongoose.model("User", UserSchema);
module.exports = User;
