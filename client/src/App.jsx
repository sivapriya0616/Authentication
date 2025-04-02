import React from "react";
// import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// import { useState ,useEffect} from "react";
import "./pages/Style.css";

const App = () => {
  
  return (
  
       <Router>
      
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Logout</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Home" element={<Home />} />

        </Routes>
        
      </div>
    </Router>
    
  )
}

export default App;

             
