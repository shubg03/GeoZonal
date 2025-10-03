import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-logo-geo">Geo</span>
              <span className="footer-logo-zonal">Zonal</span>
            </h3>
            <p className="footer-description">
              A smart building compliance checker that validates geospatial data
              and ensures zoning regulations are met.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Dashboard</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/how-it-works">How It Works</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#compliance">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} GeoZonal Validator. All rights reserved.
          </p>
          <div className="footer-social">
            <span className="footer-made-with">
              Made with <span className="heart">♥</span> for better urban planning
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
