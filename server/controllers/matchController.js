const User = require("../models/User");

/* ---------------- FIND MATCHES ---------------- */
exports.findGymBuddies = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const users = await User.find({
      _id: { $ne: req.user.id }
    }).select("-password");

    let matches = [];

    users.forEach(user => {
      let score = 0;

      if (user.location === currentUser.location) score += 3;
      if (user.availableTime === currentUser.availableTime) score += 2;
      if (user.fitnessLevel === currentUser.fitnessLevel) score += 2;
      if (user.goal === currentUser.goal) score += 2;

      const commonInterests = user.interests.filter(i =>
        currentUser.interests.includes(i)
      );
      score += commonInterests.length;

      if (score > 0) {
        matches.push({
          user,
          score,
          requested: user.requests?.includes(req.user.id)
        });
      }
    });

    matches.sort((a, b) => b.score - a.score);

    res.json(matches.slice(0, 5));
  } catch (err) {
    res.status(500).json({ message: "Matching failed" });
  }
};

/* ---------------- SEND REQUEST ---------------- */
exports.sendRequest = async (req, res) => {
  try {
    const fromUser = req.user.id;
    const toUser = req.params.id;

    if (fromUser === toUser) {
      return res.status(400).json({ message: "Cannot connect to yourself" });
    }

    const target = await User.findById(toUser);

    if (!target) {
      return res.status(404).json({ message: "User not found" });
    }

    if (target.requests.includes(fromUser)) {
      return res.status(400).json({ message: "Already requested" });
    }

    target.requests.push(fromUser);
    await target.save();

    res.json({ message: "Connection request sent" });
  } catch (err) {
    res.status(500).json({ message: "Request failed" });
  }
};

/* ---------------- ACCEPT REQUEST ---------------- */
exports.acceptRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const fromId = req.params.id;

    const user = await User.findById(userId);
    const other = await User.findById(fromId);

    user.requests = user.requests.filter(
      id => id.toString() !== fromId
    );

    if (!user.connections.includes(fromId)) {
      user.connections.push(fromId);
    }

    if (!other.connections.includes(userId)) {
      other.connections.push(userId);
    }

    await user.save();
    await other.save();

    res.json({ message: "Connection accepted" });
  } catch (err) {
    res.status(500).json({ message: "Accept failed" });
  }
};

/* ---------------- REJECT REQUEST ---------------- */
exports.rejectRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const fromId = req.params.id;

    user.requests = user.requests.filter(
      id => id.toString() !== fromId
    );

    await user.save();

    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: "Reject failed" });
  }
};
