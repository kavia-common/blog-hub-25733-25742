import React, { useEffect } from 'react';

/**
 * Authentication modal with login/signup variants.
 */
// PUBLIC_INTERFACE
export function AuthModal({ open, mode = 'login', onClose, onSubmit }) {
  /** Displays a lightweight modal for authentication inputs. */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const isSignup = mode === 'signup';

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit?.({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name') || null
    });
  };

  return (
    <div role="dialog" aria-modal="true" style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div style={modalStyle} className="card">
        <div className="section-header">
          <h2 className="title" style={{ marginBottom: 2 }}>{isSignup ? 'Create an account' : 'Welcome back'}</h2>
          <p className="subtitle">{isSignup ? 'Join the Ocean Blog community' : 'Log in to continue'}</p>
        </div>
        <form className="section editor" onSubmit={handleSubmit} style={{ paddingTop: 10 }}>
          {isSignup && (
            <input className="input" name="name" placeholder="Your name" aria-label="Name" />
          )}
          <input className="input" name="email" type="email" placeholder="Email" aria-label="Email" required />
          <input className="input" name="password" type="password" placeholder="Password" aria-label="Password" required />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isSignup ? 'Sign up' : 'Login'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(17, 24, 39, 0.35)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  zIndex: 50
};

const modalStyle = {
  width: '100%',
  maxWidth: 480,
  borderRadius: 'var(--radius)',
};
