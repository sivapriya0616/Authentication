import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./pages/Style.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5001", { withCredentials: true })
      .then(res => setIsAuthenticated(res.data.valid))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    axios.post("http://localhost:5001/Logout", {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
        window.location.href = "/login";
      })
      .catch(err => console.error("Logout failed:", err));
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
            {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
            {/* {isAuthenticated && <li><button onClick={handleLogout}>Logout</button></li>} */}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;