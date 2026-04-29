import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-brand">
            Prep<em>AI</em>
          </span>
          <span className="footer-sep">·</span>
          <span className="footer-copy">© 2025 All rights reserved</span>
        </div>

        <div className="footer-links">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Help</a>
          <a href="#" className="footer-link">Feedback</a>
        </div>

        <div className="footer-status">
          <div className="footer-status-dot" />
          <span>All systems operational</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;