const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Fitness profile
    height: Number,
    weight: Number,
    fitnessLevel: String,
    goal: String,
    interests: [String],
    location: String,
    availableTime: String,

    isProfileCompleted: {
      type: Boolean,
      default: false
    },

    // Gamification
    streak: { type: Number, default: 0 },
    lastWorkoutDate: Date,
    badges: { type: [String], default: [] },

    // Social
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
