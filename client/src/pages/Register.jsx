import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // New state for success message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return; // Stop the form submission if passwords don't match
    }

    // Simple password length validation (you can enhance this)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Check if the required fields are filled
    if (email && password && confirmPassword) {
      axios
      axios
      .post("http://localhost:5001/Register", { name, email, password })        .then((res) => {
          console.log(res);
          setSuccess("Registration successful! You can now log in.");
          setError("");
          setConfirmPassword(""); // Clear any previous error
          setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
        })
        .catch((err) => {
          // Handle error from the backend, like user already existing
          console.log(err);
          if (err.response && err.response.data.Message === "User already exists") {
            setName("");
            setEmail("");  // Clear email input
            setPassword("");
            setConfirmPassword("");
            setError("This email is already registered. Please use a different one.");
          } else {
            setName("");
            setEmail("");  // Clear email input
            setPassword("");
            setConfirmPassword("");
            setError("Registration failed. Please try again.");
          }
        });
    } else {

      setError("Please fill in all fields");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label>UserName</label>
            <input
              // type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Display success or error message */}
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit">
            Register
          </button>
        </form>
        <div className="login-link">
          <p>
            Already a member? <Link to="/login">Login now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;