import React from 'react';
import MapSection from '../components/MapSection';
import '../styles/Validate.css';

const Validate = () => {
  return (
    <div className="validate-page">
      <div className="validate-hero">
        <div className="validate-hero-content">
          <h1 className="validate-title">
            Interactive Validation Map
          </h1>
          <p className="validate-subtitle">
            Draw your building plot, enter road width, and get instant FSI compliance validation
          </p>
          <div className="validate-badges">
            <div className="validate-badge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 6v6c0 5 8 8 8 8s8-3 8-8V6l-8-4z" 
                      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" 
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Real-time Validation</span>
            </div>
            <div className="validate-badge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="2" 
                      stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M3 7h14M7 3v4M13 3v4" stroke="currentColor" strokeWidth="1.5" 
                      strokeLinecap="round"/>
              </svg>
              <span>FSI Regulations</span>
            </div>
            <div className="validate-badge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" 
                      strokeWidth="1.5" fill="none"/>
                <path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="1.5" 
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>

      <div className="validate-instructions">
        <div className="container">
          <h2 className="instructions-title">How to Use</h2>
          <div className="instructions-grid">
            <div className="instruction-card">
              <div className="instruction-number">1</div>
              <div className="instruction-content">
                <h3>Search Location</h3>
                <p>Use the search box to find your desired location on the map</p>
              </div>
            </div>
            <div className="instruction-card">
              <div className="instruction-number">2</div>
              <div className="instruction-content">
                <h3>Draw Plot</h3>
                <p>Click on the map to draw your building plot boundaries (minimum 3 points)</p>
              </div>
            </div>
            <div className="instruction-card">
              <div className="instruction-number">3</div>
              <div className="instruction-content">
                <h3>Enter Road Width</h3>
                <p>Input the width of the adjacent road in meters</p>
              </div>
            </div>
            <div className="instruction-card">
              <div className="instruction-number">4</div>
              <div className="instruction-content">
                <h3>Get Results</h3>
                <p>Click "Check Permit" to get instant FSI compliance validation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="validate-map-section">
        <div className="container">
          <MapSection />
        </div>
      </div>

      <div className="validate-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M16 8v8l4 4" stroke="currentColor" strokeWidth="2" 
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Real-Time Processing</h3>
              <p>Get instant validation results as you draw your plot on the map</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4L4 10v10c0 8 12 12 12 12s12-4 12-12V10L16 4z" 
                        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                  <path d="M11 16l3 3 7-7" stroke="currentColor" strokeWidth="2" 
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Accurate Calculations</h3>
              <p>Based on official FSI regulations and building codes</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="6" width="20" height="20" rx="2" 
                        stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M6 12h20M12 6v6M20 6v6" stroke="currentColor" strokeWidth="2" 
                        strokeLinecap="round"/>
                  <path d="M12 18h8M12 22h5" stroke="currentColor" strokeWidth="2" 
                        strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Detailed Reports</h3>
              <p>Comprehensive breakdown of FSI, coverage, height, and floor calculations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validate;
