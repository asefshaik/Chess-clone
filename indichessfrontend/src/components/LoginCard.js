import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOGIN_URL = "http://localhost:8080/login";
const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";

function LoginCard({ handleToggleSignup }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const [credentials, setCredentials] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    { username: "", password: "" }
  );

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ [name]: value });
  };

  const executeLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { status } = await axios.post(LOGIN_URL, credentials, { 
        withCredentials: true 
      });

      if (status === 200) {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-card">
      <header>
        <h2>Login</h2>
      </header>

      <form onSubmit={executeLogin} className="login-form">
        <div className="input-group">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onInputChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="simple-auth-btn">
          Sign In
        </button>
      </form>

      <section className="oauth-buttons">
        <SocialButton 
          href={GOOGLE_AUTH_URL} 
          label="Continue with Google" 
          variant="google" 
        />
      </section>

      <footer className="login-footer">
        <button 
          type="button" 
          className="link-btn" 
          onClick={handleToggleSignup}
        >
          Create Account
        </button>
      </footer>
    </div>
  );
}

const SocialButton = ({ href, label, variant }) => (
  <a href={href} className={`btn-${variant}`}>
    <button type="button">{label}</button>
  </a>
);

export default LoginCard;