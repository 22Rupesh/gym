const User = require("../models/User");
const {
  generateWorkoutPlan,
  generateDietPlan
} = require("../services/aiService");

exports.getWorkoutPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const plan = await generateWorkoutPlan(user);

    res.json({ workoutPlan: plan });
  } catch (err) {
  console.error("🔥 AI ERROR FULL:", err); // ADD THIS
  res.status(500).json({ message: "Workout AI failed" });
}
};

exports.getDietPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const plan = await generateDietPlan(user);

    res.json({ dietPlan: plan });
  } catch (err) {
    res.status(500).json({ message: "Diet AI failed" });
  }
};
