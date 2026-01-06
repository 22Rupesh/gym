import React, { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    const res = await API.post("/auth/register", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/profile";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create <span className="text-red-600">Account</span>
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Start your fitness journey today
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
          className="flex flex-col space-y-5"
        >
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="block w-full px-4 py-3 bg-zinc-800 text-white
                       border border-zinc-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="block w-full px-4 py-3 bg-zinc-800 text-white
                       border border-zinc-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="block w-full px-4 py-3 bg-zinc-800 text-white
                       border border-zinc-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="submit"
            className="block w-full py-3 bg-red-600 text-white rounded-lg font-semibold
                       hover:bg-red-700 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/" className="text-red-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
