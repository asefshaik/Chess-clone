import React, { useState } from "react";
import axios from "axios";

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "India",
  "Germany", "France", "Japan", "South Korea", "Mexico",
  "Brazil", "China", "Russia", "Italy",
];

function SignupCard({ handleToggleSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: "",
    country: "",
  });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/signup", formData);

      if (response.status === 200) {
        handleToggleSignup();
      }
    } catch (err) {
      setError("Error in signup. Please try again.");
    }
  };

  const renderInput = (label, id, type = "text", placeholder) => (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={formData[id]}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <div className="signup-card">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup} className="signup-form">
        {renderInput("Username", "username", "text", "Enter your username")}
        {renderInput("Email", "emailId", "email", "Enter your email")}
        {renderInput("Password", "password", "password", "Enter your password")}

        <div className="input-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="simple-auth-btn">
          Sign Up
        </button>
      </form>

      <div className="login-link">
        <span>Already an existing user?</span>
        <button 
          type="button" 
          className="simple-auth-btn" 
          onClick={handleToggleSignup}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignupCard;