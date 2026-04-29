import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidenav.css";
import { useAuth } from "../../Auth/Hooks/useAuth";

const NAV_ITEMS = [
  {
    section: "Prepare",
    items: [
      {
        key: "home",
        path: "/home",
        label: "Dashboard",
        icon: (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <rect x="1.5" y="1.5" width="5" height="5" rx="1.5" fill="currentColor"/>
            <rect x="8.5" y="1.5" width="5" height="5" rx="1.5" fill="currentColor" opacity=".4"/>
            <rect x="1.5" y="8.5" width="5" height="5" rx="1.5" fill="currentColor" opacity=".4"/>
            <rect x="8.5" y="8.5" width="5" height="5" rx="1.5" fill="currentColor" opacity=".4"/>
          </svg>
        ),
      },
      {
        key: "generate",
        path: "/home",
        label: "Generate Report",
        icon: (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2.5 12.5l3.5-3.5 2.5 2.5L13 4" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
        ),
      },
      {
        key: "reports",
        path: "/home",
        label: "My Reports",
        badge: null,
        icon: (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3 3.5h9M3 7h6M3 10.5h4.5" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
        ),
      },
    ],
  },
];

const SideNav = ({ reportCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "U";

  // ✅ FIX: define logout handler
  const onLogout = async () => {
    try {
      setLoggingOut(true);

      await handleLogout();

      // optional cleanup
      localStorage.clear();
      sessionStorage.clear();

      navigate("/login"); // redirect
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="sidenav">
      <div className="sidenav-scroll">
        {NAV_ITEMS.map((group) => (
          <div key={group.section} className="sn-group">
            <p className="sn-section-label">{group.section}</p>

            {group.items.map((item) => {
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.key}
                  className={`sn-item ${active ? "sn-item--active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="sn-icon">{item.icon}</span>
                  <span className="sn-label">{item.label}</span>

                  {item.key === "reports" && reportCount > 0 && (
                    <span className="sn-badge sn-badge--count">
                      {reportCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* ✅ USER CARD */}
      <div className="sn-user-card">
        <div className="sn-user-info">
          <div className="sn-avatar">{initials}</div>
          <div className="sn-user-text">
            <p className="sn-user-name">{user?.username || "User"}</p>
            <p className="sn-user-email">{user?.email || ""}</p>
          </div>
        </div>

        {/* ✅ LOGOUT BUTTON */}
        <button
          className="sn-logout"
          onClick={onLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </aside>
  );
};

export default SideNav;