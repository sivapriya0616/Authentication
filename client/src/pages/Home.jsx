import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Corrected import

const HomePage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Renamed from 'Navigate' to avoid conflict
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('http://localhost:5001') // The API call
      .then(res => {
        if (res.data.valid) {
          setName(res.data.name); // If valid, set the user's name
        } else {
          navigate('/login'); // Redirect to login if the session is invalid
        }
      })
      .catch(err => {
        console.error(err); // Log any errors from the API call
        // alert('An error occurred while checking session status'); 
      });
  }, []); 

  return (
    <div className="homepage">
      <h1>Welcome {name}</h1>
    </div>
  );
};

export default HomePage;