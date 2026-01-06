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
