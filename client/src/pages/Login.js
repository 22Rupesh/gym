import React, { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);

    const profile = await API.get("/profile/me");
    if (profile.data.isProfileCompleted) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/profile";
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Gym<span className="text-red-600">Buddy</span>
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Train together. Grow stronger.
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          className="flex flex-col space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 bg-zinc-800 text-white 
                       border border-zinc-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 bg-zinc-800 text-white 
                       border border-zinc-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="submit"
            className="block w-full py-3 bg-red-600 text-white rounded-lg font-semibold
                       hover:bg-red-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          New here?{" "}
          <a href="/register" className="text-red-500 hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
