import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import * as turf from '@turf/turf';

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) { onMapClick(e.latlng); }
  });
  return null;
}

export default function MapValidator() {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [vertices, setVertices] = useState([]); // array of [lat, lng]
  const [areaSqm, setAreaSqm] = useState(null);
  const [roadWidth, setRoadWidth] = useState('');
  const [result, setResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

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
  };

  const finishDrawing = () => {
    if (vertices.length < 3) {
      alert('Need at least 3 points to form a polygon');
      return;
    }
    // convert to [lng, lat] array for turf
    const coords = vertices.map(([lat, lng]) => [lng, lat]);
    // close ring if needed
    if (coords[0][0] !== coords[coords.length-1][0] || coords[0][1] !== coords[coords.length-1][1]) {
      coords.push(coords[0]);
    }
    const poly = turf.polygon([coords]);
    const area = turf.area(poly); // area in square meters
    setAreaSqm(area);
    setDrawing(false);

    // fit bounds to polygon
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
  };

  // Nominatim search (forward geocoding)
  const doSearch = async (q) => {
    setSearchQuery(q);
    if (!q) { setSearchResults([]); return; }
    setLoadingSearch(true);
    try {
      // Please respect Nominatim usage policy for production usage
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
       map.flyTo([lat, lon], 20, { duration: 1.2 });
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
    if (!roadWidth) { alert('Please enter road width (m)'); return; }

    try {
      const res = await axios.post('http://localhost:9000/submit', {
        plot: { area: parseFloat(plotArea) },
        road: { width: parseFloat(roadWidth) }
      });
      setResult(res.data.result);
    } catch (err) {
      console.error('Submit error', err);
      alert('Error submitting to backend. Make sure backend is running and CORS is enabled.');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>GeoZonal Validator — Map UI</h1>

      <div style={{ position: 'relative' }}>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: 500 }} whenCreated={mapInstance => { mapRef.current = mapInstance }}>
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

          {vertices.length > 0 && (
            <Polygon positions={vertices} />
          )}
        </MapContainer>

        {/* Search box (top-left) */}
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: 'white', padding: 8, borderRadius: 6 }}>
          <input
            placeholder="Search place (city, address, etc)"
            value={searchQuery}
            onChange={(e) => doSearch(e.target.value)}
            style={{ width: 280, padding: 6 }}
          />
          {loadingSearch && <div style={{ fontSize: 12 }}>Searching…</div>}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(s => (
                <div key={s.place_id} className="search-item" onClick={() => selectPlace(s)}>
                  {s.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="controls" style={{ marginTop: 10 }}>
        <button onClick={startDrawing}>Start Drawing Polygon</button>
        <button onClick={finishDrawing} disabled={!drawing}>Finish Drawing</button>
        <button onClick={clearAll}>Clear</button>

        <div style={{ marginLeft: 8 }}>
          <label style={{ marginRight: 6 }}>Road width (m):</label>
          <input type="number" value={roadWidth} onChange={(e) => setRoadWidth(e.target.value)} style={{ width: 120, padding: 6 }} />
        </div>

        <div>
          <button onClick={handleSubmit}>Validate (send to backend)</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div>Plot area (sqm): <strong>{areaSqm ? areaSqm.toFixed(2) : '—'}</strong></div>

        {result && (
          <div className="results">
            <h3>Calculated Permissions</h3>
            <div>Permissible FSI: {result.permissible_fsi}</div>
            <div>Plot Area: {result.plot_area_sqm} sqm</div>
            <div>Max Built-up Area: {result.max_builtup_area_sqm} sqm</div>
            <div>Max Building Height: {result.max_building_height_m} m</div>
            <div>Max Floors: {result.max_floors}</div>
            <div>Permissible Footprint: {result.permissible_footprint_sqm} sqm</div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <small>Usage: Click "Start Drawing Polygon" then click on map to add vertices. "Finish Drawing" will compute the area. Or click once on the map to place a point and manually enter the area when submitting. Search uses Nominatim (OpenStreetMap).</small>
      </div>
    </div>
  );
}