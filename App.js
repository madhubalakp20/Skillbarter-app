import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SkillKnown from "./pages/SkillKnown";
import SkillWanted from "./pages/SkillWanted";
import LearningPage from "./pages/LearningPage";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";

// 🔒 Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first!");
    navigate("/login", { state: { from: location.pathname } });
    return null;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected */}
        <Route path="/skill-known" element={<ProtectedRoute><SkillKnown /></ProtectedRoute>} />
        <Route path="/skill-wanted" element={<ProtectedRoute><SkillWanted /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
