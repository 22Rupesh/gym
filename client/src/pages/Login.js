// // // import React, { useState } from "react";
// // // import API from "../services/api";

// // // export default function Login() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   const handleLogin = async () => {
// // //     const res = await API.post("/auth/login", { email, password });
// // //     localStorage.setItem("token", res.data.token);
// // //     window.location.href = "/dashboard";
// // //   };

// // //   return (
// // //     <div style={{ textAlign: "center", marginTop: 100 }}>
// // //       <h2>Gym Buddy Login</h2>
// // //       <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
// // //       <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>
// // //       <button onClick={handleLogin}>Login</button>
// // //       <p>
// // //   New user? <a href="/register">Register</a>
// // // </p>

// // //     </div>
// // //   );
// // // }



// // import React, { useState } from "react";
// // import API from "../services/api";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// // //   const login = async () => {
// // //     const res = await API.post("/auth/login", { email, password });
// // //     localStorage.setItem("token", res.data.token);
// // //     window.location.href = "/profile";
// // //   };

// // const login = async () => {
// //   const res = await API.post("/auth/login", { email, password });
// //   localStorage.setItem("token", res.data.token);

// //   // 🔍 Fetch profile
// //   const profile = await API.get("/profile/me");

// //   if (profile.data.isProfileCompleted) {
// //     window.location.href = "/dashboard";
// //   } else {
// //     window.location.href = "/profile";
// //   }
// // };


// //   return (
// //     <div style={{ textAlign: "center", marginTop: 100 }}>
// //         <h1 className="text-4xl font-bold text-red-600">
// //   Tailwind is working 🚀
// // </h1>

// //       <h2>Login</h2>
// //       <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br /><br />
// //       <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br /><br />
// //       <button onClick={login}>Login</button>
// //       <p><a href="/register">New user? Register</a></p>
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import API from "../services/api";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     const res = await API.post("/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);

//     const profile = await API.get("/profile/me");
//     if (profile.data.isProfileCompleted) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/profile";
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        

//         {/* LOGO / TITLE */}
//         <h2 className="text-3xl font-bold text-center text-white mb-2">
//           Gym<span className="text-red-600">Buddy</span>
//         </h2>
//         <p className="text-center text-gray-400 mb-8">
//           Train together. Grow stronger.
//         </p>

//         {/* EMAIL */}
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 px-4 py-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg
//                      focus:outline-none focus:ring-2 focus:ring-red-600"
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg
//                      focus:outline-none focus:ring-2 focus:ring-red-600"
//         />

//         {/* BUTTON */}
//         <button
//           onClick={login}
//           className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold
//                      hover:bg-red-700 transition-all duration-300"
//         >
//           Login
//         </button>

//         {/* FOOTER */}
//         <p className="text-center text-sm text-gray-400 mt-6">
//           New here?{" "}
//           <a href="/register" className="text-red-500 hover:underline">
//             Create account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



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
