// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import "./pages/Style.css";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     axios.get("http://localhost:5001", { withCredentials: true })
//       .then(res => setIsAuthenticated(res.data.valid))
//       .catch(err => console.error(err));
//   }, []);

//   const handleLogout = () => {
//     axios.post("http://localhost:5001/Logout", {}, { withCredentials: true })
//       .then(() => {
//         setIsAuthenticated(false);
//         navigate('/login'); // Use navigate to redirect to the login page
//       })
//       .catch(err => console.error("Logout failed:", err));
//   };

//   return (
//     <Router>
//       <div className="App">
//         <nav>
//           <ul>
//             {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
//             {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<Home handleLogout={handleLogout} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Routes, Route, Link, useNavigate,useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./pages/Style.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route


  useEffect(() => {
    axios
      .get("http://localhost:5001", { withCredentials: true })
      .then((res) => setIsAuthenticated(res.data.valid))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5001/Logout", {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
        navigate("/login");
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
  
      <div className="App">
        {location.pathname !== "/" && (
        <nav >
          <ul className="nav3" >
            {!isAuthenticated && <li ><Link to="/login">Login</Link></li>}
            {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
          </ul>
        </nav>
      )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home handleLogout={handleLogout} />} />
        </Routes>
      </div>
  
  );
};

export default App;