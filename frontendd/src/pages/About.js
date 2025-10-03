import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About GeoZonal Validator</h1>
          <p className="about-subtitle">
            Empowering urban planning with smart technology
          </p>
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            GeoZonal Validator is committed to simplifying building compliance verification
            through advanced geospatial technology. We help government officials, urban
            planners, architects, and property owners ensure their projects meet all
            zoning regulations and building codes.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <div className="feature-grid">
            <div className="feature-box">
              <h3>Real-time Validation</h3>
              <p>
                Instantly verify building compliance against FSI (Floor Space Index)
                regulations, height restrictions, and coverage ratios.
              </p>
            </div>
            <div className="feature-box">
              <h3>Interactive Mapping</h3>
              <p>
                Draw plot boundaries with precision using OpenStreetMap integration
                and get accurate area calculations.
              </p>
            </div>
            <div className="feature-box">
              <h3>Automated Reports</h3>
              <p>
                Generate comprehensive compliance reports with all necessary metrics
                and permissible building parameters.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose Us</h2>
          <ul className="benefits-list">
            <li>✓ Accurate and up-to-date zoning regulations</li>
            <li>✓ User-friendly interface for all skill levels</li>
            <li>✓ Fast processing and instant results</li>
            <li>✓ Comprehensive compliance checking</li>
            <li>✓ Available 24/7 from anywhere</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
