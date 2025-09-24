import React from 'react';

/**
 * Footer component for the application
 */
// PUBLIC_INTERFACE
export function Footer() {
  /** Renders footer with brand and quick links. */
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} Ocean Blog</div>
        <div>
          <a className="link" href="#/">Home</a>
          <span style={{ margin: '0 10px' }}>·</span>
          <a className="link" href="#/new">Write</a>
        </div>
      </div>
    </footer>
  );
}
