// components/UserProfile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic (clear token, context, etc.)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <div className="avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : "👤"}
        </div>
        <div className="user-details">
          <h3>{user?.name || "John Doe"}</h3>
          <p>{user?.email || "john@example.com"}</p>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default UserProfile;