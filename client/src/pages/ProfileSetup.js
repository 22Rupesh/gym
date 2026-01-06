import React, { useState } from "react";
import API from "../services/api";
import { useEffect } from "react";

export default function ProfileSetup() {
  const [form, setForm] = useState({
    height: "",
    weight: "",
    fitnessLevel: "",
    goal: "",
    availableTime: "",
    location: "",
    interests: ""
  });
useEffect(() => {
  const checkProfile = async () => {
    const res = await API.get("/profile/me");
    if (res.data.isProfileCompleted) {
      window.location.href = "/dashboard";
    }
  };
  checkProfile();
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProfile = async () => {
    const payload = {
      ...form,
      interests: form.interests.split(",").map(i => i.trim())
    };

    await API.put("/profile/update", payload);
    window.location.href = "/dashboard";
  };

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto" }}>
//       <h2>Complete Your Fitness Profile</h2>

//       <input name="height" placeholder="Height (cm)" onChange={handleChange} /><br/><br/>
//       <input name="weight" placeholder="Weight (kg)" onChange={handleChange} /><br/><br/>

//       <select name="fitnessLevel" onChange={handleChange}>
//         <option value="">Fitness Level</option>
//         <option>Beginner</option>
//         <option>Intermediate</option>
//         <option>Advanced</option>
//       </select><br/><br/>

//       <select name="goal" onChange={handleChange}>
//         <option value="">Goal</option>
//         <option>Muscle Gain</option>
//         <option>Fat Loss</option>
//         <option>Endurance</option>
//       </select><br/><br/>

//       <input name="availableTime" placeholder="Workout Time (e.g. 7PM-8PM)" onChange={handleChange} /><br/><br/>
//       <input name="location" placeholder="City / Area" onChange={handleChange} /><br/><br/>

//       <input
//         name="interests"
//         placeholder="Interests (comma separated)"
//         onChange={handleChange}
//       /><br/><br/>

//       <button onClick={submitProfile}>Save & Continue</button>
//     </div>
//   );


return (
  <div className="min-h-screen bg-black flex items-center justify-center text-white">
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Complete Your <span className="text-red-600">Profile</span>
      </h2>

      <div className="space-y-4">
        {["height","weight","availableTime","location","interests"].map(f => (
          <input
            key={f}
            name={f}
            placeholder={f}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg"
          />
        ))}

        <select name="fitnessLevel" onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg">
          <option value="">Fitness Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select name="goal" onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg">
          <option value="">Goal</option>
          <option>Muscle Gain</option>
          <option>Fat Loss</option>
          <option>Endurance</option>
        </select>

        <button
          onClick={submitProfile}
          className="w-full py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700"
        >
          Save & Continue
        </button>
      </div>
    </div>
  </div>
);


}
