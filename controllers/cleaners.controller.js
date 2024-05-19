const express = require("express");
const router = express.Router();
const Images = require("../models/model");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const Cleaners = require("../models/cleaners.models");
const asyncHandler = require("express-async-handler"); // Install express-async-handler

const files = [];
const fileInArray = [];

//~<--------------------STORAGE for IMAGE------------------>

//^   DESTINATION & STORAGE -------->  !   ORIGINAL FILENAME

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = uuid();
    const filePath = `${id}${ext}`;
    fileInArray.push(filePath);
    cb(null, filePath);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  storage: storage,
});

//^<---------------Get images--------------------->

router.get("/images", (req, res) => {
  Images.find()
    .then((img) => {
      res.json(img);
    })
    .catch((err) => {
      res.status(400).json(`Error: ${err}`);
    });
});

//^<---------------Post images--------------------->

router.post("/images/add", upload.array("uploaded_Image", 5), (req, res) => {
  const newImage = new Images({
    name: req.body.name,
    uploaded_Image: fileInArray,
  });

  newImage
    .save()
    .then(() => {
      res.json("Image upload success!");
    })
    .catch((err) => console.log(`Error: ${err}`));

  files.length = 0;
  fileInArray.length = 0;
});

//^<---------------Cleaners Routes--------------------->

// Get All Cleaners
router.get(
  "/cleaners",
  asyncHandler(async (req, res) => {
    const cleaners = await Cleaners.find({});
    res.status(200).json(cleaners);

    if (!cleaners) {
      res.status(500).json({ message: "Error while getting cleaners." });
    }
  })
);

// Send or create Cleaner
router.post("/cleaners", upload.array("img", 5), async (req, res) => {
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
      return;
    }
    const img = fileInArray;
    const cleaner = await Cleaners.create({
      name,
      businessName,
      location,
      address,
      desc,
      phoneNumber,
      img,
      user_id: req.user.id, // The CRUD will be for the ID of the authorized user
    });
    res.status(200).json(cleaner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    files.length = 0;
    fileInArray.length = 0;
  }
});

// Get A Cleaner
router.get(
  "/cleaners/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cleaner = await Cleaners.findById(id);
    res.status(200).json(cleaner);

    if (!cleaner) {
      res.status(400).json({ message: "Cleaner not found." });
    }
  })
);

// Update A Cleaner
router.put(
  "/cleaners/:id",
  upload.array("img", 5),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cleanerToUpdate = await Cleaners.findById(id);

    if (!cleanerToUpdate) {
      res.status(400).json({ message: "Cleaner not found." });
      return;
    }

    // Check for a user trying to update another user's cleaners
    if (cleanerToUpdate.user_id.toString() !== req.user.id) {
      res.status(403).json({
        message: "You don't have permission to update other users' cleaners!",
      });
      return;
    }

    const updatedData = {
      ...req.body,
      img: fileInArray.length ? fileInArray : cleanerToUpdate.img,
    };

    const updatedCleaner = await Cleaners.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedCleaner);

    if (!updatedCleaner) {
      res
        .status(500)
        .json({ message: "Error trying to update cleaner, try again." });
    } else {
      files.length = 0;
      fileInArray.length = 0;
    }
  })
);

// Delete A Cleaner
router.delete(
  "/cleaners/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cleanerToDelete = await Cleaners.findById(id);

    if (!cleanerToDelete) {
      res.status(400).json({ message: "Cleaner not found." });
      return;
    }

    if (cleanerToDelete.user_id.toString() !== req.user.id) {
      res.status(403).json({
        message: "You don't have permission to delete other users' cleaners!",
      });
      return;
    }

    await Cleaners.findByIdAndDelete(id);
    res.status(200).json({ message: "Cleaner deleted successfully." });
  })
);

module.exports = router;
