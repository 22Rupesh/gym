const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { checkInWorkout } = require("../controllers/streakController");

router.post("/check-in", auth, checkInWorkout);

module.exports = router;
