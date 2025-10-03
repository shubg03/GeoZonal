import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage({ type: '', text: '' }); // Clear message when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: '✓ Registration successful! Redirecting to sign in...' });
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: 'Server connection error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <Link to="/" className="auth-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L8 12V24C8 36 24 44 24 44C24 44 40 36 40 24V12L24 4Z" 
                    fill="white" opacity="0.2"/>
              <path d="M24 4L8 12V24C8 36 24 44 24 44C24 44 40 36 40 24V12L24 4Z" 
                    stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M24 16V32M16 24H32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>GeoZonal</span>
          </Link>
          <h1 className="auth-branding-title">Start Your Journey!</h1>
          <p className="auth-branding-text">
            Create your account and get instant access to powerful geospatial validation tools.
          </p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Free to Get Started</span>
            </div>
            <div className="auth-feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>No Credit Card Required</span>
            </div>
            <div className="auth-feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Create Account</h2>
              <p className="auth-form-subtitle">
                Fill in your details to get started
              </p>
            </div>

            {message.text && (
              <div className={`auth-message ${message.type}`}>
                {message.text}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M3 18a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" 
                          strokeLinecap="round" fill="none"/>
                  </svg>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" 
                          stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M2 5l8 5 8-5" stroke="currentColor" strokeWidth="1.5" 
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="4" y="9" width="12" height="9" rx="1" 
                          stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" 
                          strokeLinecap="round"/>
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="8"
                  />
                </div>
                <p className="form-hint">Must be at least 8 characters</p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="4" y="9" width="12" height="9" rx="1" 
                          stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" 
                          strokeLinecap="round"/>
                  </svg>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" required />
                  <span className="checkbox-text">
                    I agree to the <a href="#terms" className="form-link">Terms of Service</a> and{' '}
                    <a href="#privacy" className="form-link">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or sign up with</span>
            </div>

            <div className="social-buttons">
              <button className="btn-social">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19.6 10.2c0-.7 0-1.3-.1-2H10v3.8h5.4c-.2 1.2-1 2.2-2 2.9v2.5h3.2c1.9-1.7 3-4.3 3-7.2z" 
                        fill="#4285F4"/>
                  <path d="M10 20c2.7 0 4.9-.9 6.5-2.4l-3.2-2.5c-.9.6-2 .9-3.3.9-2.5 0-4.7-1.7-5.4-4H1.3v2.6C3 17.8 6.3 20 10 20z" 
                        fill="#34A853"/>
                  <path d="M4.6 11.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V5.5H1.3C.5 7 0 8.4 0 10s.5 3 1.3 4.5l3.3-2.6z" 
                        fill="#FBBC05"/>
                  <path d="M10 4c1.4 0 2.7.5 3.7 1.4l2.8-2.8C14.9 1 12.7 0 10 0 6.3 0 3 2.2 1.3 5.5l3.3 2.6C5.3 5.7 7.5 4 10 4z" 
                        fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="btn-social">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.608V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.595-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z"/>
                </svg>
                Facebook
              </button>
            </div>

            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/signin" className="auth-footer-link">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
