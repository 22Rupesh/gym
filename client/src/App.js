import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";
import ConnectedPartners from "./pages/ConnectedPartners";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<ProfileEdit />} />

        <Route path="/connections" element={<ConnectedPartners />} />
        <Route path="/chat/:id" element={<Chat />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
