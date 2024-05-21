// import Cleaners from "../models/cleaners.models";
const Cleaners = require("../models/cleaners.models");
const asyncHandler = require("express-async-handler"); // Install express-async-handler

// Get All Cleaners
const getCleaners = asyncHandler(async (req, res) => {
  const cleaners = await Cleaners.find({});
  res.status(200).json(cleaners);

  if (!cleaners) {
    res.status(500);
    res.json({ message: "Error while getting cleaners." });
    // throw new Error("Error while getting cleaners.");
  }
});

// Send or create Cleaner
const createCleaner = async (req, res) => {
  // Saving data to mongoDb using our model
  try {
    const { name, businessName, location, address, desc, phoneNumber } =
      req.body;
    if (
      !name ||
      !businessName ||
      !location ||
      !address ||
      !desc ||
      !phoneNumber
    ) {
      res.status(400).json({ message: "All fields are required!" });
      // throw new Error("The non-optional fields are required!");
    }
    const cleaner = await Cleaners.create({
      name,
      businessName,
      location,
      address,
      desc,
      phoneNumber,
      user_id: req.user.id, //The CRUD will be for the ID of the authorized user
    });
    res.status(200).json(cleaner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get A Cleaner
const getCleaner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cleaner = await Cleaners.findById(id);
  res.status(200).json(cleaner);

  if (!cleaner) {
    res.status(400).json({ message: "Cleaner not found." });
  }
});

// Update A Cleaner
const updateCleaner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cleanerToUpdate = await Cleaners.findById(id);

  if (!cleanerToUpdate) {
    res.status(400).json({ message: "Cleaner not found." });
  }

  // A check for a user trying to update another users cleaners
  if (cleanerToUpdate.user_id.toString() !== req.user.id) {
    res.status(403);
    res.json({
      message: "You don't have permission to update other users cleaners!",
    });
  }

  const updatedCleaner = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedCleaner);

  if (!updateCleaner) {
    res
      .status(500)
      .json({ message: "Error trying to update cleaner, try again." });
  }
});

// Delete A Cleaner
const deleteCleaner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cleanerToDelete = await Cleaners.findById(id);

  if (!cleanerToDelete) {
    res.status(400).res.json({ message: "Cleaner not found." });
  }

  const deletedCleaner = await cleanerToDelete.findByIdAndDelete(id);
  res.status(200).json({ message: cleanerToDelete + " deleted" });

  if (!deletedCleaner) {
    res.status(500).json({ message: "Cleaner not deleted. Error occurred." });
  }
});

module.exports = {
  getCleaners,
  createCleaner,
  getCleaner,
  updateCleaner,
  deleteCleaner,
};
