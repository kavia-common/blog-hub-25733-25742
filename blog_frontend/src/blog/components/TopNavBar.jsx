import React from 'react';

/**
 * Top navigation bar with brand, search, and auth buttons.
 */
// PUBLIC_INTERFACE
export function TopNavBar({ onLogin, onSignup, search, onSearch }) {
  /** Renders a sticky top navigation with search and actions. */
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand" role="button" onClick={() => (window.location.hash = '#/')} aria-label="Go to home">
          <div className="brand-badge" />
          <div className="brand-title">Ocean Blog</div>
        </div>
        <div className="nav-spacer" />
        <div style={{ maxWidth: 480, width: '100%' }}>
          <input
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            className="input"
            placeholder="Search posts..."
            aria-label="Search posts"
          />
        </div>
        <div className="nav-actions">
          <button className="btn btn-primary" onClick={onLogin}>Login</button>
          <button className="btn btn-amber" onClick={onSignup}>Sign up</button>
        </div>
      </div>
    </nav>
  );
}
