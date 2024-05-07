const mongoose = require("mongoose");

const CleanersSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      unique: [true, "Store name already exist."],
      required: [true, "Please provide store name."],
    },
    description: {
      type: String,
      unique: false,
      required: [true, "Please provide store description."],
    },
    image: {
      type: String,
      unique: false,
      required: [false, "Please provide store image."],
    },
    phoneNumber: {
      type: Number,
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
  mongoose.model.Cleaners || mongoose.model("Cleaner", CleanersSchema);

module.exports = Cleaners;
