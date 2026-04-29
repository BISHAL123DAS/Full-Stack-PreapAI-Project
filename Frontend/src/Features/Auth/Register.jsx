import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Auth/Hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="formContainer">
      <div className="card">
      <h4 className="title">Welcome to <span className="logo-name">Prep<em>AI</em></span></h4>

        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="username">User Name</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="Enter your name"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="loginBtn">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;