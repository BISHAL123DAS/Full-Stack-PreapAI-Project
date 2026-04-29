import React from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Footer from "./Footer";
import "./AppLayout.css";

/**
 * AppLayout — wraps every authenticated page.
 *
 * Props:
 *   user        — current user object { name, email }
 *   onLogout    — logout handler
 *   reportCount — number of reports (passed to SideNav badge)
 *   showSidebar — boolean, default true. Pass false for full-width pages.
 *   children    — page content
 */
const AppLayout = ({ user, onLogout, reportCount = 0, showSidebar = true, children }) => {
    console.log("333333333333",user)
  return (
    <div className="app-root">
      <Header user={user} onLogout={onLogout} />

      <div className="app-body">
        {showSidebar && (
          <Sidenav user={user} onLogout={onLogout} reportCount={reportCount} />
        )}
        <main className={`app-main ${!showSidebar ? "app-main--full" : ""}`}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;