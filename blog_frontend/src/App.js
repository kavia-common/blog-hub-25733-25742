import React from 'react';
import './App.css';
import './index.css';
import { BlogApp } from './blog/BlogApp';

/**
 * Root App component rendering the BlogApp
 */
// PUBLIC_INTERFACE
function App() {
  /** This is the public entrypoint to the blog frontend application. */
  return <BlogApp />;
}

export default App;
