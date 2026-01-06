import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [profile, setProfile] = useState({
    requests: [],
  });
  const [partners, setPartners] = useState([]);
  const [workout, setWorkout] = useState("");
  const [diet, setDiet] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = await API.get("/profile/me");
    const partnerRes = await API.get("/match/find");
    const workoutRes = await API.get("/ai/workout");
    const dietRes = await API.get("/ai/diet");

    setProfile(user.data);
    setPartners(partnerRes.data);
    setWorkout(workoutRes.data.workoutPlan);
    setDiet(dietRes.data.dietPlan);
  };

  const checkIn = async () => {
    await API.post("/streak/check-in");
    loadData();
  };
  

  const connectPartner = async (id) => {
    await API.post(`/match/connect/${id}`);
    loadData();
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <Navbar profile={profile} refresh={loadData} />

      <div className="p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome, <span className="text-red-600">{profile.name}</span> 💪
        </h1>

        {/* STREAK */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-10 
                        flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">🔥 Workout Streak</h2>
            <p className="text-3xl font-bold text-red-600">
              {profile.streak || 0} days
            </p>
          </div>
          <button
            onClick={checkIn}
            className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Check-in
          </button>
        </div>

        {/* MATCHES */}
        <h2 className="text-2xl font-semibold mb-4">🤝 Gym Partner Matches</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {partners.map((p, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <h3 className="text-xl font-bold">{p.user.name}</h3>
              <p className="text-gray-400">{p.user.fitnessLevel}</p>
              <p className="text-gray-400">{p.user.goal}</p>
              <p className="text-gray-400">{p.user.location}</p>

              <p className="text-red-500 font-semibold mt-2">
                Match Score: {p.score}
              </p>

              <button
                disabled={p.requested}
                onClick={() => connectPartner(p.user._id)}
                className={`mt-4 w-full py-2 rounded-lg font-semibold
                  ${p.requested
                    ? "bg-zinc-700 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"}`}
              >
                {p.requested ? "Requested" : "Connect"}
              </button>
            </div>
          ))}
        </div>

        {/* AI PLANS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-3">
               AI Workout Plan
            </h2>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap">
              {workout}
            </pre>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-3">
              AI Diet Plan
            </h2>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap">
              {diet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
