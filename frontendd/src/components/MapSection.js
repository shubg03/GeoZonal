import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import * as turf from '@turf/turf';
import '../styles/MapSection.css';

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) { onMapClick(e.latlng); }
  });
  return null;
}

const MapSection = () => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [vertices, setVertices] = useState([]);
  const [areaSqm, setAreaSqm] = useState(null);
  const [roadWidth, setRoadWidth] = useState('');
  const [result, setResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [currentFloors, setCurrentFloors] = useState('');
  const [floorStatus, setFloorStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onMapClick = (latlng) => {
    if (drawing) {
      setVertices(prev => [...prev, [latlng.lat, latlng.lng]]);
    } else {
      setMarker(latlng);
    }
  };

  const startDrawing = () => {
    setDrawing(true);
    setVertices([]);
    setAreaSqm(null);
    setMarker(null);
    setResult(null);
    setFloorStatus(null);
  };

  const finishDrawing = () => {
    if (vertices.length < 3) {
      alert('Need at least 3 points to form a polygon');
      return;
    }
    const coords = vertices.map(([lat, lng]) => [lng, lat]);
    if (coords[0][0] !== coords[coords.length-1][0] || coords[0][1] !== coords[coords.length-1][1]) {
      coords.push(coords[0]);
    }
    const poly = turf.polygon([coords]);
    const area = turf.area(poly);
    setAreaSqm(area);
    setDrawing(false);

    const map = mapRef.current;
    if (map) {
      const latlngs = vertices.map(v => [v[0], v[1]]);
      map.fitBounds(latlngs);
    }
  };

  const clearAll = () => {
    setVertices([]);
    setAreaSqm(null);
    setMarker(null);
    setResult(null);
    setDrawing(false);
    setCurrentFloors('');
    setFloorStatus(null);
    setRoadWidth('');
  };

  // Nominatim search
  const doSearch = async (q) => {
    setSearchQuery(q);
    if (!q) { setSearchResults([]); return; }
    setLoadingSearch(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=6&q=${encodeURIComponent(q)}&addressdetails=1`;
      const resp = await axios.get(url);
      setSearchResults(resp.data);
    } catch (err) {
      console.error('Nominatim search error', err);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const selectPlace = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    setMarker({ lat, lng: lon }); 

    const map = mapRef.current;
    if (map){
       map.flyTo([lat, lon], 18, { duration: 1.2 });
    }

    setSearchResults([]);
    setSearchQuery(place.display_name);
  };

  const handleSubmit = async () => {
    let plotArea = areaSqm;
    if (!plotArea) {
      const entered = prompt('Plot area (sqm) not detected. Enter plot area in sqm:');
      if (!entered) return;
      plotArea = parseFloat(entered);
    }
    if (!roadWidth) { 
      alert('Please enter road width (m)'); 
      return; 
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:9000/submit', {
        plot: { area: parseFloat(plotArea) },
        road: { width: parseFloat(roadWidth) }
      });
      setResult(res.data.result);
      setFloorStatus(null);
    } catch (err) {
      console.error('Submit error', err);
      alert('Error submitting to backend. Make sure backend is running and CORS is enabled.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkFloorStatus = () => {
    if (result && currentFloors) {
      if (parseInt(currentFloors) > result.max_floors) {
        setFloorStatus('illegal');
      } else {
        setFloorStatus('legal');
      }
    } else {
      setFloorStatus(null);
    }
  };

  return (
    <div className="map-section">
      <div className="map-section-header">
        <div className="map-section-header-content">
          <h2 className="map-section-title">Interactive Validation Map</h2>
          <p className="map-section-subtitle">
            Search, draw plot boundaries, and validate building compliance in real-time
          </p>
        </div>
      </div>

      {/* Large Map Container */}
      <div className="map-wrapper">
        <div className="map-container-box">
          <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }} 
            whenCreated={mapInstance => { mapRef.current = mapInstance }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <ClickHandler onMapClick={onMapClick} />
            {marker && (
              <Marker position={[marker.lat, marker.lng]}>
                <Popup>Selected location</Popup>
              </Marker>
            )}
            {vertices.length > 0 && <Polygon positions={vertices} />}
          </MapContainer>

          {/* Search Box Overlay */}
          <div className="map-search-overlay">
            <div className="search-box">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search for a location (city, address, landmark...)"
                value={searchQuery}
                onChange={(e) => doSearch(e.target.value)}
              />
              {loadingSearch && (
                <div className="search-loading">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(s => (
                  <div 
                    key={s.place_id} 
                    className="search-result-item" 
                    onClick={() => selectPlace(s)}
                  >
                    <svg className="result-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor"/>
                      <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5z" 
                            stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                    {s.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel">
          <div className="controls-section">
            <h3 className="controls-title">Drawing Tools</h3>
            <div className="button-group">
              <button 
                className={`btn-control ${drawing ? 'btn-active' : 'btn-primary'}`}
                onClick={startDrawing}
                disabled={drawing}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L2 6v5c0 5 8 9 8 9s8-4 8-9V6l-8-4z" 
                        stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                {drawing ? 'Drawing...' : 'Start Drawing'}
              </button>
              <button 
                className="btn-control btn-success"
                onClick={finishDrawing}
                disabled={!drawing || vertices.length < 3}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16 6L8 14l-4-4" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Finish Drawing
              </button>
              <button 
                className="btn-control btn-secondary"
                onClick={clearAll}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 6h12M6 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6h12z" 
                        stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                Clear All
              </button>
            </div>
          </div>

          <div className="controls-section">
            <h3 className="controls-title">Plot Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">Plot Area</label>
                <div className="info-value">
                  {areaSqm ? `${areaSqm.toFixed(2)} m²` : '—'}
                </div>
              </div>
              <div className="info-item">
                <label className="info-label">Road Width (m)</label>
                <input 
                  type="number" 
                  className="input-field"
                  placeholder="Enter width..."
                  value={roadWidth} 
                  onChange={(e) => setRoadWidth(e.target.value)}
                  min="1"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <div className="controls-section">
            <button 
              className="btn-validate"
              onClick={handleSubmit}
              disabled={isSubmitting || !roadWidth}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Validating...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1v18M1 10h18" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Validate Building
                </>
              )}
            </button>
          </div>

          {result && (
            <>
              <div className="results-panel">
                <h3 className="results-title">Compliance Results</h3>
                <div className="results-grid">
                  <div className="result-card">
                    <div className="result-label">FSI</div>
                    <div className="result-value">{result.permissible_fsi}</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Max Built-up Area</div>
                    <div className="result-value">{result.max_builtup_area_sqm} m²</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Max Height</div>
                    <div className="result-value">{result.max_building_height_m} m</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Max Floors</div>
                    <div className="result-value">{result.max_floors}</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Ground Coverage</div>
                    <div className="result-value">{result.permissible_footprint_sqm} m²</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Plot Area</div>
                    <div className="result-value">{result.plot_area_sqm} m²</div>
                  </div>
                </div>
              </div>

              <div className="controls-section">
                <h3 className="controls-title">Check Building Legality</h3>
                <div className="legality-check">
                  <input 
                    type="number" 
                    className="input-field"
                    placeholder="Current floors..."
                    value={currentFloors}
                    onChange={(e) => setCurrentFloors(e.target.value)}
                    min="1"
                  />
                  <button 
                    className="btn-check"
                    onClick={checkFloorStatus}
                    disabled={!currentFloors}
                  >
                    Check Status
                  </button>
                </div>
                {floorStatus && (
                  <div className={`status-badge status-${floorStatus}`}>
                    {floorStatus === 'legal' ? (
                      <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M16 6L8 14l-4-4" 
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Legal Building ✓
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M6 6l8 8M14 6l-8 8" 
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Illegal Building ✗
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="map-instructions">
        <div className="instruction-card">
          <div className="instruction-icon">📍</div>
          <h4>1. Search Location</h4>
          <p>Use the search box to find your location or click on the map</p>
        </div>
        <div className="instruction-card">
          <div className="instruction-icon">✏️</div>
          <h4>2. Draw Plot</h4>
          <p>Click "Start Drawing" and mark your plot boundaries on the map</p>
        </div>
        <div className="instruction-card">
          <div className="instruction-icon">📏</div>
          <h4>3. Enter Details</h4>
          <p>Provide road width and any additional information required</p>
        </div>
        <div className="instruction-card">
          <div className="instruction-icon">✅</div>
          <h4>4. Validate</h4>
          <p>Click validate to check building compliance with zoning rules</p>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
