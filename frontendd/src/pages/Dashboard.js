import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" fill="currentColor"/>
            </svg>
            Smart Building Compliance
          </div>
          <h1 className="hero-title">
            Validate Your <span className="gradient-text">Building Compliance</span> Effortlessly
          </h1>
          <p className="hero-description">
            Use advanced geospatial tools to draw plot boundaries, analyze zoning regulations, 
            and ensure your building meets all compliance standards in real-time.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Validations</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">99%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card feature-card-primary">
            <div className="feature-icon feature-icon-primary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 10v8c0 7.5 12 14 12 14s12-6.5 12-14v-8L16 4z" 
                      stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M16 12v8M12 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="feature-title">Real-time Validation</h3>
            <p className="feature-description">
              Instantly check building compliance against FSI regulations and zoning laws
            </p>
          </div>

          <div className="feature-card feature-card-secondary">
            <div className="feature-icon feature-icon-secondary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z" 
                      stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="feature-title">Interactive Maps</h3>
            <p className="feature-description">
              Draw plot boundaries with precision using OpenStreetMap integration
            </p>
          </div>

          <div className="feature-card feature-card-accent">
            <div className="feature-icon feature-icon-accent">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M28 8H4M28 16H4M28 24H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="22" cy="8" r="2" fill="currentColor"/>
                <circle cx="22" cy="16" r="2" fill="currentColor"/>
                <circle cx="22" cy="24" r="2" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="feature-title">Automated Calculations</h3>
            <p className="feature-description">
              Get instant FSI, height limits, and floor count calculations
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Validate Now */}
      <section className="validate-cta-section">
        <div className="validate-cta-content">
          <div className="validate-cta-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" 
                    stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M24 16v12l6 6" stroke="currentColor" strokeWidth="2" 
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="validate-cta-title">Start Validating Your Building Plot</h2>
          <p className="validate-cta-description">
            Use our interactive map to draw your plot, enter specifications, and get instant FSI compliance results
          </p>
          <button 
            className="btn-validate-primary"
            onClick={() => navigate('/validate')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L2 6v6c0 5 8 8 8 8s8-3 8-8V6l-8-4z" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" 
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Start Validation
          </button>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-preview-section">
        <div className="map-preview-content">
          <h2 className="map-preview-title">Interactive Validation Map</h2>
          <p className="map-preview-subtitle">
            Draw your building plot and get instant compliance validation
          </p>
          <div className="map-preview-image">
            <div className="map-placeholder">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="10" y="10" width="100" height="100" rx="8" 
                      stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
                <path d="M30 50L50 70L90 30" stroke="currentColor" strokeWidth="3" 
                      strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2" 
                        fill="none" opacity="0.3"/>
              </svg>
              <p>Click "Start Validation" to access the interactive map</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to validate your building?</h2>
          <p className="cta-description">
            Join thousands of users who trust GeoZonal Validator for accurate compliance checks
          </p>
          <div className="cta-buttons">
            <button 
              className="btn-cta-primary"
              onClick={() => navigate('/validate')}
            >
              Get Started Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className="btn-cta-secondary"
              onClick={() => navigate('/about')}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
