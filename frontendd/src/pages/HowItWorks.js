import React from 'react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <div className="how-it-works-hero">
        <h1>How It Works</h1>
        <p>Simple, fast, and accurate building compliance validation</p>
      </div>

      <div className="how-it-works-content">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Search for Location</h3>
          <p>
            Use our integrated search to find your location or click directly on the map.
            Our system uses OpenStreetMap for accurate location identification.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Draw Plot Boundaries</h3>
          <p>
            Click "Start Drawing" and mark your plot boundaries by clicking on the map.
            The system automatically calculates the plot area using Turf.js.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Enter Road Width</h3>
          <p>
            Provide the width of the nearest road in meters. This is crucial for
            calculating the FSI (Floor Space Index) and building height limits.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <h3>Get Instant Results</h3>
          <p>
            Click "Validate" and receive comprehensive compliance results including
            permissible FSI, maximum floors, height limits, and ground coverage.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">5</div>
          <h3>Check Building Legality</h3>
          <p>
            Enter the current floor count of your building to instantly verify if
            it complies with the calculated regulations.
          </p>
        </div>
      </div>

      <div className="regulations-info">
        <h2>Understanding FSI Regulations</h2>
        <div className="regulation-table">
          <div className="regulation-row regulation-header">
            <div>Road Width</div>
            <div>Permissible FSI</div>
            <div>Height Factor</div>
          </div>
          <div className="regulation-row">
            <div>≤ 9m</div>
            <div>1.1</div>
            <div>1.5 × Road Width</div>
          </div>
          <div className="regulation-row">
            <div>9m - 12m</div>
            <div>1.3</div>
            <div>1.5 × Road Width</div>
          </div>
          <div className="regulation-row">
            <div>12m - 18m</div>
            <div>1.5</div>
            <div>1.5 × Road Width</div>
          </div>
          <div className="regulation-row">
            <div>&gt; 18m</div>
            <div>2.0</div>
            <div>1.5 × Road Width</div>
          </div>
        </div>
        <p className="regulation-note">
          * Coverage Ratio: 65% of plot area allowed for ground coverage
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
