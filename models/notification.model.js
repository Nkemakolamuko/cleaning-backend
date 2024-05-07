const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "It is required!"],
      unique: false,
    },

    category: {
      type: String,
      required: [true, "It is required!"],
      unique: false,
    },

    desc: {
      type: String,
      required: [true, "It is required!"],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.Schema.Notification || // the variable to export will be assigned to Notification collection in the mongoose db
  mongoose.Schema("Notification", NotificationSchema); //  But if it doesn't exist already, if a collection of Notification doesn't exist, then we create one with the properties of the NotificationSchema
module.exports = Notification; // Then we export the variable they are assigned to
