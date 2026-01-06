const User = require("../models/User");

exports.checkInWorkout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastWorkoutDate) {
      const last = new Date(user.lastWorkoutDate);
      last.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (today - last) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) {
        return res.json({ message: "Workout already checked in today", streak: user.streak });
      }

      if (diffDays === 1) {
        user.streak += 1;
      } else {
        user.streak = 1; // streak broken
      }
    } else {
      user.streak = 1;
    }

    user.lastWorkoutDate = today;

    // 🎖️ BADGES
    if (user.streak === 7) user.badges.push("7-Day Streak");
    if (user.streak === 30) user.badges.push("30-Day Streak");
    if (user.streak === 90) user.badges.push("90-Day Streak");

    await user.save();

    res.json({
      message: "Workout checked in",
      streak: user.streak,
      badges: user.badges
    });
  } catch (err) {
    res.status(500).json({ message: "Streak update failed" });
  }
};
