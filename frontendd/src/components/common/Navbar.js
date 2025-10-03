import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (userData && isAuthenticated === 'true') {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    navigate('/');
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 8V16C4 24 16 30 16 30C16 30 28 24 28 16V8L16 2Z" 
                    fill="currentColor" opacity="0.2"/>
              <path d="M16 2L4 8V16C4 24 16 30 16 30C16 30 28 24 28 16V8L16 2Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M16 10V22M10 16H22" stroke="currentColor" strokeWidth="2" 
                    strokeLinecap="round"/>
            </svg>
          </div>
          <span className="logo-text">
            <span className="logo-geo">Geo</span>
            <span className="logo-zonal">Zonal</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/validate" className="nav-link">Validate</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/how-it-works" className="nav-link">How It Works</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          {user ? (
            <>
              <span className="user-welcome">
                Welcome, {user.fullName}
              </span>
              <button 
                className="btn-nav-signout" 
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn-nav-signin" 
                onClick={() => navigate('/signin')}
              >
                Sign In
              </button>
              <button 
                className="btn-nav-signup" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
