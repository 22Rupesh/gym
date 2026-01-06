const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();

// ✅ TEMPORARY OPEN CORS (for Render)
app.use(cors({ origin: "*" }));

// app.use(cors());
app.use(express.json());

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("GymBuddy Backend is running 🚀");
});

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/match", require("./routes/matchRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/streak", require("./routes/streakRoutes"));

app.use("/api/chat", require("./routes/chatRoutes"));


/* ================= SOCKET.IO SETUP ================= */

// create HTTP server from express app
const server = http.createServer(app);

const Message = require("./models/Message");

// attach socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


// socket logic
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);
//   });

//   socket.on("sendMessage", (data) => {
//     io.to(data.roomId).emit("receiveMessage", data);
//   });

  socket.on("joinRoom", roomId => {
    socket.join(roomId);
  });

//   socket.on("sendMessage", data => {
//     io.to(data.roomId).emit("receiveMessage", data);
//   });

socket.on("sendMessage", async (data) => {
  await Message.create({
    roomId: data.roomId,
    sender: data.sender,
    text: data.text
  });

  io.to(data.roomId).emit("receiveMessage", data);
});

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});


/* =================================================== */

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running with Socket.io on port ${PORT}`)
);
