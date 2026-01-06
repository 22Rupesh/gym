const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

//  WORKOUT PLAN
exports.generateWorkoutPlan = async (user) => {
  const prompt = `
Create a personalized gym workout plan.

User details:
- Height: ${user.height} cm
- Weight: ${user.weight} kg
- Fitness Level: ${user.fitnessLevel}
- Goal: ${user.goal}

Give:
- 3 day workout split
- Exercises with sets & reps
- Simple format
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", //  ACTIVE MODEL
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
};

// DIET PLAN
exports.generateDietPlan = async (user) => {
  const prompt = `
Create a simple Indian diet plan.

User:
- Weight: ${user.weight} kg
- Goal: ${user.goal}

Include:
- Calories
- Protein
- Meals
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", //  ACTIVE MODEL
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
};
