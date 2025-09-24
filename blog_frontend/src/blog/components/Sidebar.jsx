import React from 'react';

/**
 * Sidebar wrapper if needed in future expansions.
 * Currently categories and tags are built in BlogApp for easy state access.
 */
// PUBLIC_INTERFACE
export function Sidebar({ children }) {
  /** Simple pass-through wrapper for future extension. */
  return <aside className="sidebar">{children}</aside>;
}
