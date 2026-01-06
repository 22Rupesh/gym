import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ConnectedPartners() {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile/connections").then(res => {
      setPartners(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">🤝 Connected Partners</h1>

        {partners.length === 0 ? (
          <p className="text-gray-400">No connections yet</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {partners.map(p => (
              <div
                key={p._id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
              >
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-gray-400">{p.fitnessLevel}</p>
                <p className="text-gray-400">{p.goal}</p>
                <p className="text-gray-400">{p.location}</p>

                <button
                  onClick={() => navigate(`/chat/${p._id}`)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                >
                  Chat 💬
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
