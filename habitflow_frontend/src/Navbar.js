import React from "react";

/**
 * PUBLIC_INTERFACE
 * Navbar component for StreakFlow app. Left: App name, Right: profile icon.
 * Minimal, pastel/light, airy, fixed to top, with soft shadow and bottom border.
 */
function Navbar() {
  return (
    <nav className="streakflow-navbar">
      <div className="streakflow-navbar-content" style={{fontFamily: "'Poppins','Inter',Arial,sans-serif"}}>
        <div className="streakflow-appname">
          <span role="img" aria-label="growth chart" className="streakflow-appicon">
            📈
          </span>
          StreakFlow
        </div>
        <div className="streakflow-profile">
          {/* Profile icon; can be replaced with SVG/avatar later */}
          <span role="img" aria-label="profile" className="streakflow-profile-icon">
            👤
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
