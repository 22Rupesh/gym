// // import { useEffect, useState } from "react";
// // import API from "../services/api";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../components/Navbar";



// // export default function ConnectedPartners() {
// //   const [partners, setPartners] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     API.get("/profile/connections").then(res => {
// //       setPartners(res.data);
// //     });
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-black text-white">
// //       <Navbar />

// //       <div className="p-6">
// //         <h1 className="text-3xl font-bold mb-6">🤝 Connected Partners</h1>

// //         {partners.length === 0 ? (
// //           <p className="text-gray-400">No connections yet</p>
// //         ) : (
// //           <div className="grid md:grid-cols-3 gap-6">
// //             {partners.map(p => (
// //               <div
// //                 key={p._id}
// //                 className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
// //               >
// //                 <h3 className="text-xl font-bold">{p.name}</h3>
// //                 <p className="text-gray-400">{p.fitnessLevel}</p>
// //                 <p className="text-gray-400">{p.goal}</p>
// //                 <p className="text-gray-400">{p.location}</p>

// //                 <button
// //                   onClick={() => navigate(`/chat/${p._id}`)}
// //                   className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
// //                 >
// //                   Chat 💬
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import Navbar from "../components/Navbar";

// const socket = io("http://localhost:5000");

// export default function Chat() {
//   const { id } = useParams();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const roomId = id;

//   useEffect(() => {
//     socket.emit("joinRoom", roomId);

//     socket.on("receiveMessage", data => {
//       setMessages(prev => [...prev, data]);
//     });

//     return () => socket.off("receiveMessage");
//   }, [roomId]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const msg = {
//       roomId,
//       text: message,
//       sender: "me"
//     };

//     socket.emit("sendMessage", msg);
//     setMessages(prev => [...prev, msg]);
//     setMessage("");
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Navbar />

//       {/* CHAT AREA */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         {messages.length === 0 && (
//           <p className="text-gray-400 text-center">
//             Start your first conversation 💬
//           </p>
//         )}

//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`mb-3 ${
//               m.sender === "me" ? "text-right" : "text-left"
//             }`}
//           >
//             <span className="inline-block bg-zinc-800 px-4 py-2 rounded-lg">
//               {m.text}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* INPUT */}
//       <div className="p-4 border-t border-zinc-800 flex gap-2">
//         <input
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//           placeholder="Type message..."
//           className="flex-1 px-4 py-2 bg-zinc-800 rounded-lg outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-red-600 px-4 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../services/api";
import Navbar from "../components/Navbar";

const socket = io("http://localhost:5000");

export default function Chat() {
  const { id: partnerId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState("");

  useEffect(() => {
    // get logged in user id
    API.get("/profile/me").then(res => {
      setMyId(res.data._id);
    });
  }, []);

  useEffect(() => {
  if (!myId) return;

  const roomId = [myId, partnerId].sort().join("_");

  API.get(`/chat/messages/${roomId}`).then(res => {
    setMessages(res.data);
  });
}, [myId, partnerId]);


  useEffect(() => {
    if (!myId) return;

    const roomId = [myId, partnerId].sort().join("_");

    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", data => {
      setMessages(prev => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [myId, partnerId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const roomId = [myId, partnerId].sort().join("_");

    const msg = {
      roomId,
      text: message,
      sender: myId
    };

    socket.emit("sendMessage", msg);
    setMessages(prev => [...prev, msg]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-1 p-6 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-3 ${
              m.sender === myId ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block bg-zinc-800 px-4 py-2 rounded-lg">
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800 flex gap-2">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 px-4 py-2 bg-zinc-800 rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="bg-red-600 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
