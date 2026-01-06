// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const { findGymBuddies } = require("../controllers/matchController");

// router.get("/find", auth, findGymBuddies);

// module.exports = router;



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
