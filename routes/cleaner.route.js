const express = require("express");
const router = express.Router();
const {
  getCleaners,
  getCleaner,
  updateCleaner,
  deleteCleaner,
  createCleaner,
} = require("../controllers/cleaners.controller");
const validateToken = require("../middleware/validateTokenHandler.js");

router.use(validateToken);
router.get("/", getCleaners);

router.get("/:id", getCleaner);

router.post("/", createCleaner);

router.put("/:id", updateCleaner);

router.delete("/:id", deleteCleaner);

module.exports = router;
