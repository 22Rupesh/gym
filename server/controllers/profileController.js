// const User = require("../models/User");

// // UPDATE PROFILE
// exports.updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: req.body },
//       { new: true }
//     ).select("-password");

//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ message: "Profile update failed" });
//   }
// };

// // GET PROFILE
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch profile" });
//   }
// };



const User = require("../models/User");

// UPDATE PROFILE (ONLY FIRST TIME REQUIRED)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...req.body,
          isProfileCompleted: true   // 👈 MAIN FIX
        }
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

// GET PROFILE
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch profile" });
//   }
// };


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("requests", "name fitnessLevel goal location");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};



// exports.getConnections = async (req, res) => {
//   const user = await User.findById(req.user.id)
//     .populate("connections", "name fitnessLevel goal location");

//   res.json(user.connections);
// };


exports.getConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("connections", "name fitnessLevel goal location");

    res.json(user.connections);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch connections" });
  }
};
