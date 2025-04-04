
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Home = ({ handleLogout }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001", { withCredentials: true })
      .then(res => {
        if (res.data.valid) {
          setName(res.data.name); // If valid, set the user's name
        } else {
          navigate('/login'); // Redirect to login if the session is invalid
        }
      })
      .catch(err => {
        console.error(err); // Log any errors from the API call
      });
  }, []);

  return (
    <div className="homepage">
      <nav className="nav2">
        <ul className="nav1">
          <li className="navv">Welcome, {name}</li>
          <li>
            <button className=" logout" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;