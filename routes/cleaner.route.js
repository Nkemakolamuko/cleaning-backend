const express = require("express");
const router = express.Router();
const { getCleaners } = require("../controllers/cleaners.controller");
const validateToken = require("../middleware/validateTokenHandler.js");

router.use(validateToken);
router.get("/", getCleaners);

module.exports = router;
