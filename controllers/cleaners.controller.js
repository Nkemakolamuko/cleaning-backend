// import Cleaners from "../models/cleaners.models";
const Cleaners = require("../models/cleaners.models");
const asyncHandler = require("express-async-handler"); // Install express-async-handler

const getCleaners = asyncHandler(async (req, res) => {
  const cleaners = await Cleaners.find({});
  res.status(200).json(cleaners);

  if (!cleaners) {
    res.status(500);
    res.json({ message: "Error while getting cleaners." });
    // throw new Error("Error while getting cleaners.");
  }
});

module.exports = {
  getCleaners,
};
