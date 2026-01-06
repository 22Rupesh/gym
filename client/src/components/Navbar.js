// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// export default function Navbar({ profile, refresh }) {
//   const [open, setOpen] = useState(false);
//   const [showReq, setShowReq] = useState(false);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const acceptReq = async (id) => {
//     await API.post(`/match/accept/${id}`);
//     refresh();
//   };

//   const rejectReq = async (id) => {
//     await API.post(`/match/reject/${id}`);
//     refresh();
//   };

//   return (
//     <div className="flex justify-between items-center px-6 py-4 
//                     bg-zinc-900 border-b border-zinc-800">

//       {/* LOGO */}
//       <h1 className="text-xl font-bold text-white">
//         Gym<span className="text-red-600">Buddy</span>
//       </h1>

//       <div className="flex items-center gap-4 relative">

//         {/* 🔔 NOTIFICATION */}
//         <button
//           onClick={() => setShowReq(!showReq)}
//           className="relative text-2xl"
//         >
//           🔔
//           {profile.requests?.length > 0 && (
//             <span className="absolute -top-1 -right-2 bg-red-600 
//                              text-xs px-2 rounded-full">
//               {profile.requests.length}
//             </span>
//           )}
//         </button>

//         {showReq && (
//           <div className="absolute right-12 top-12 w-80 
//                           bg-zinc-900 border border-zinc-800 
//                           rounded-xl p-4 z-50">
//             <h3 className="font-semibold mb-3">Connection Requests</h3>

//             {profile.requests?.length === 0 ? (
//               <p className="text-gray-400 text-sm">No requests</p>
//             ) : (
//               profile.requests.map(r => (
//                 <div key={r._id} className="mb-3 border-b border-zinc-800 pb-3">
//                   <p className="font-semibold">{r.name}</p>
//                   <p className="text-sm text-gray-400">
//                     {r.fitnessLevel} · {r.goal}
//                   </p>

//                   <div className="flex gap-2 mt-2">
//                     <button
//                       onClick={() => acceptReq(r._id)}
//                       className="flex-1 bg-green-600 py-1 rounded"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => rejectReq(r._id)}
//                       className="flex-1 bg-red-600 py-1 rounded"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {/* PROFILE ICON */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="w-10 h-10 rounded-full bg-red-600 
//                      flex items-center justify-center font-bold"
//         >
//           {profile?.name?.charAt(0) || "U"}
//         </button>

//         {open && (
//           <div className="absolute right-0 top-12 w-56 
//                           bg-zinc-900 border border-zinc-800 
//                           rounded-xl p-4 z-50">
//             <p className="font-semibold">{profile.name}</p>
//             <p className="text-sm text-gray-400 mb-3">{profile.email}</p>

//             <button
//               onClick={() => navigate("/settings")}
//               className="w-full mb-2 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
//             >
//               Edit Profile
//             </button>
//             <button
//   onClick={() => navigate("/connections")}
//   className="w-full mb-2 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
// >
//   🤝 Connections
// </button>


//             <button
//               onClick={logout}
//               className="w-full py-2 bg-red-600 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Navbar({ profile = {}, refresh }) {
  const [open, setOpen] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const navigate = useNavigate();

  const requests = profile?.requests || [];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const acceptReq = async (id) => {
    await API.post(`/match/accept/${id}`);
    refresh && refresh();
  };

  const rejectReq = async (id) => {
    await API.post(`/match/reject/${id}`);
    refresh && refresh();
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 
                    bg-zinc-900 border-b border-zinc-800">

      {/* LOGO */}
      <h1 className="text-xl font-bold">
        Gym<span className="text-red-600">Buddy</span>
      </h1>

      <div className="flex items-center gap-4 relative">

        {/* 🔔 NOTIFICATION */}
        <button
          onClick={() => setShowReq(!showReq)}
          className="relative text-2xl"
        >
          🔔
          {requests.length > 0 && (
            <span className="absolute -top-1 -right-2 
                             bg-red-600 text-xs px-2 rounded-full">
              {requests.length}
            </span>
          )}
        </button>

        {showReq && (
          <div className="absolute right-12 top-12 w-80 
                          bg-zinc-900 border border-zinc-800 
                          rounded-xl p-4 z-50">
            <h3 className="font-semibold mb-3">Connection Requests</h3>

            {requests.length === 0 ? (
              <p className="text-gray-400 text-sm">No requests</p>
            ) : (
              requests.map(r => (
                <div key={r._id} className="mb-3 border-b border-zinc-800 pb-3">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-gray-400">
                    {r.fitnessLevel} · {r.goal}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => acceptReq(r._id)}
                      className="flex-1 bg-green-600 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectReq(r._id)}
                      className="flex-1 bg-red-600 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PROFILE ICON */}
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-red-600 
                     flex items-center justify-center font-bold"
        >
          {profile?.name?.charAt(0) || "U"}
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-56 
                          bg-zinc-900 border border-zinc-800 
                          rounded-xl p-4 z-50">
            <p className="font-semibold">{profile?.name}</p>
            <p className="text-sm text-gray-400 mb-3">
              {profile?.email}
            </p>

            <button
              onClick={() => navigate("/connections")}
              className="w-full mb-2 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
            >
              🤝 Connections
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="w-full mb-2 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
            >
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="w-full py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
