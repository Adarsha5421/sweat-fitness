const express = require("express");
const { calculateCalories, calculateMacros, calculateOneRepMax } = require("../controllers/calculatorController");

const router = express.Router();

router.get("/calories", calculateCalories);
router.get("/macros", calculateMacros);
router.get("/one-rep-max", calculateOneRepMax);

module.exports = router;
