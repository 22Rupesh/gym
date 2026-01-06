// const express = require("express");
// const router = express.Router();
// const { updateProfile, getProfile } = require("../controllers/profileController");
// const auth = require("../middleware/authMiddleware");

// router.put("/update", auth, updateProfile);
// router.get("/me", auth, getProfile);

// module.exports = router;



const express = require("express");
const router = express.Router();

const { updateProfile, getProfile, getConnections } = require("../controllers/profileController");
const auth = require("../middleware/authMiddleware");

router.put("/update", auth, updateProfile);
router.get("/me", auth, getProfile);
router.get("/connections", auth, getConnections);

module.exports = router;
