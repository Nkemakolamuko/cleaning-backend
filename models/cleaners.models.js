const mongoose = require("mongoose");

const CleanersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
      required: [true, "Please provide your full name."],
    },
    businessName: {
      type: String,
      unique: [true, "Store name already exist."],
      required: [true, "Please provide store name."],
    },
    desc: {
      type: String,
      unique: false,
      required: [true, "Please provide store description."],
    },
    favorite: {
      type: Boolean,
      unique: false,
      default: false,
      required: false,
    },
    location: {
      type: String,
      unique: false,
      required: [true, "Please provide store location."],
    },
    rating: {
      type: Number,
      unique: false,
      default: 0,
      required: false,
    },
    address: {
      type: String,
      unique: true,
      required: [true, "Please provide store address."],
    },
    phoneNumber: {
      type: String,
      unique: [
        true,
        "Phone number exist for another store, consider using another one.",
      ],
      required: [true, "Please provide store phone number."],
    },
  },
  { timestamps: true }
);

const Cleaners =
  mongoose.models.Cleaners || mongoose.model("Cleaner", CleanersSchema);

module.exports = Cleaners;
