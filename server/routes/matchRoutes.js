const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  findGymBuddies,
  sendRequest,
  acceptRequest,
  rejectRequest
} = require("../controllers/matchController");

const router = express.Router();

router.get("/find", auth, findGymBuddies);
router.post("/connect/:id", auth, sendRequest);
router.post("/accept/:id", auth, acceptRequest);
router.post("/reject/:id", auth, rejectRequest);

module.exports = router;
