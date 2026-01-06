import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function ProfileEdit() {
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
    API.get("/profile/me").then(res => {
      const u = res.data;
      setForm({
        height: u.height || "",
        weight: u.weight || "",
        fitnessLevel: u.fitnessLevel || "",
        goal: u.goal || "",
        availableTime: u.availableTime || "",
        location: u.location || "",
        interests: (u.interests || []).join(", ")
      });
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    await API.put("/profile/update", {
      ...form,
      interests: form.interests.split(",").map(i => i.trim())
    });
    alert("Profile updated");
    window.location.href = "/dashboard";
  };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

//       {["height","weight","availableTime","location","interests"].map(f => (
//         <input
//           key={f}
//           name={f}
//           placeholder={f}
//           value={form[f]}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 border rounded"
//         />
//       ))}

//       <select name="fitnessLevel" value={form.fitnessLevel} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
//         <option value="">Fitness Level</option>
//         <option>Beginner</option>
//         <option>Intermediate</option>
//         <option>Advanced</option>
//       </select>

//       <select name="goal" value={form.goal} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
//         <option value="">Goal</option>
//         <option>Muscle Gain</option>
//         <option>Fat Loss</option>
//         <option>Endurance</option>
//       </select>

//       <button onClick={saveProfile} className="w-full bg-blue-600 text-white py-2 rounded">
//         Save Changes
//       </button>
//     </div>
//   );


return (
  <div className="min-h-screen bg-black flex items-center justify-center text-white">
    <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl p-8">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit <span className="text-red-600">Profile</span>
      </h2>

      <div className="space-y-4">
        {["height","weight","availableTime","location","interests"].map(f => (
          <input
            key={f}
            name={f}
            value={form[f]}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg"
          />
        ))}

        <select name="fitnessLevel" value={form.fitnessLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select name="goal" value={form.goal}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg">
          <option>Muscle Gain</option>
          <option>Fat Loss</option>
          <option>Endurance</option>
        </select>

        <button
          onClick={saveProfile}
          className="w-full py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
);


}
