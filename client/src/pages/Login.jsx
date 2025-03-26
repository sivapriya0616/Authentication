import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import open from "../assets/open.jpg";
import closed from "../assets/closed.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error message
  const navigate = useNavigate(); // For navigation after successful login
  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle between true and false
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      // Send the login request to the backend
      axios
        .post("http://localhost:5001/Login", { email, password })
        .then((res) => {
          if (res.data.Login) {
            // Login success: redirect to the home page
            navigate("/"); // Redirect to homepage on success
          } else {
            // Invalid login credentials or user doesn't exist
            setError(res.data.Message || "Invalid credentials, please try again.");
            // Clear the input fields when user doesn't exist
            setEmail(""); // Clear email input
            setPassword(""); // Clear password input
          }
        })
        .catch((err) => {
          // Handle any errors (e.g., server errors)
          console.log(err);
          setError("There was an error processing your login. Please try again.");
          setEmail(""); // Clear email input
          setPassword(""); // Clear password input
        });
    } else {
      setError("Please fill in both fields.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container password-container">
            <label>Password</label>
            <div className="password-input">
              <input
                type={passwordVisible ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-icon"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {passwordVisible ? (
                  <img  className='open' src={open} alt="Eye icon to hide password" /> // Open eye icon
                ) : (
                  <img className='closed' src={closed} alt="Eye icon to show password" /> // Closed eye icon
                )}
              </button>
            </div>
          </div>

          {/* Display error message if any */}
          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit">
            Login
          </button>
        </form>

        {/* Link to the Registration page */}
        <div className="signup-link">
          <p>
            Not a member? <Link to="/register">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;