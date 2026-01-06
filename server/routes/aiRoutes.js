const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getWorkoutPlan,
  getDietPlan
} = require("../controllers/aiController");

router.get("/workout", auth, getWorkoutPlan);
router.get("/diet", auth, getDietPlan);

module.exports = router;
