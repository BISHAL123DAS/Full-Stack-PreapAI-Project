import React, { useState } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Auth/Hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await handleLogin({ email, password });

    if (res.success) {
      navigate("/home");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="formContainer">
      <div className="card">
        <h4 className="title">
          Welcome to <span className="logo-name">Prep<em>AI</em></span>
        </h4>

        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="loginBtn" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>

        <p className="account_messagestyle">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;