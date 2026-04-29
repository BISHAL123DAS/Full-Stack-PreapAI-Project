import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Auth/Hooks/useAuth";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, handleLogout, loading } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const isHome = location.pathname === "/home";

    const initials = user?.username
        ? user.username
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : user?.email?.[0]?.toUpperCase() || "U";

    // ✅ FIX: Proper logout handler
    const onLogout = async () => {
        try {
            await handleLogout();
            localStorage.clear();
            sessionStorage.clear();
            navigate("/login");
        } catch (e) {
            console.error("Logout failed", e);
        }
    };

    return (
        <header className="header">
            <div className="header-inner">
                {/* Logo */}
                <button className="header-logo" onClick={() => navigate("/home")}>
                    <div className="logo-mark">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M9 2L3 6v8h4v-4h4v4h4V6L9 2z"
                                fill="#fff"
                                fillOpacity=".9"
                            />
                            <rect x="7" y="10" width="4" height="4" rx="1" fill="#eb2f6e" />
                        </svg>
                    </div>
                    <span className="logo-name">
                        Prep<em>AI</em>
                    </span>
                </button>

                <div className="header-sep" />
                <span className="header-sub">Interview Intelligence</span>

                <div className="header-spacer" />

                {/* Nav */}
                <nav className="header-nav">
                    <button
                        className={`hn-link ${isHome ? "hn-link--active" : ""}`}
                        onClick={() => navigate("/home")}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M2 11V5.5L7 2l5 3.5V11"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <rect
                                x="5"
                                y="7.5"
                                width="2"
                                height="3.5"
                                rx=".8"
                                fill="currentColor"
                            />
                        </svg>
                        Dashboard
                    </button>
                </nav>

                {/* User */}
                <div
                    className="header-user"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <div className="header-avatar">{initials}</div>
                    <span className="header-username">
                        {user?.username || user?.email || "Account"}
                    </span>

                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                            d="M3 4.5l3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                        />
                    </svg>

                    {menuOpen && (
                        <div
                            className="header-dropdown"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="hd-user-info">
                                <div className="hd-avatar">{initials}</div>
                                <div>
                                    <p className="hd-name">{user?.username || "User"}</p>
                                    <p className="hd-email">{user?.email || ""}</p>
                                </div>
                            </div>

                            <div className="hd-divider" />

                            <button
                                className="hd-item"
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/home");
                                }}
                            >
                                Dashboard
                            </button>

                            <div className="hd-divider" />

                            {/* ✅ Logout Button */}
                            <button
                                className="hd-item hd-item--danger"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onLogout();
                                }}
                                disabled={loading}
                            >
                                {loading ? "Signing out..." : "Sign out"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;