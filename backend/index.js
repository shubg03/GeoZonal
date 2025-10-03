const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const { calculatePermissibleBuilding } = require('./middleware/check-permit');
const { registerUser, loginUser, getAllUsers } = require('./middleware/auth');

const app = express();
const PORT = 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Constants for building regulations
const FSI_BY_ROAD_WIDTH = [
  { maxWidth: 9, fsi: 1.1 },
  { maxWidth: 12, fsi: 1.3 },
  { maxWidth: 18, fsi: 1.5 },
  { maxWidth: Infinity, fsi: 2.0 }
];
const COVERAGE_RATIO = 0.65; // 65% ground coverage allowed
const FLOOR_HEIGHT = 3.0;    // in meters
const HEIGHT_FACTOR = 1.5;   // maxHeight = roadWidth × 1.5

// Route to receive JSON from frontend and calculate permissions
app.post('/submit', (req, res) => {
  const data = req.body;

  const plotArea = parseFloat(data.plot.area);
  const roadWidth = parseFloat(data.road.width);

  // Determine applicable FSI
  let applicableFSI = 1.1;
  for (const rule of FSI_BY_ROAD_WIDTH) {
    if (roadWidth <= rule.maxWidth) {
      applicableFSI = rule.fsi;
      break;
    }
  }

  // Calculate permissions
  const permissibleBuiltupArea = plotArea * applicableFSI;
  const maxBuildingHeight = roadWidth * HEIGHT_FACTOR;
  const maxFloors = Math.floor(maxBuildingHeight / FLOOR_HEIGHT);
  const permissibleFootprint = plotArea * COVERAGE_RATIO;

  // Prepare result object
  const result = {
    permissible_fsi: applicableFSI,
    plot_area_sqm: plotArea.toFixed(2),
    max_builtup_area_sqm: permissibleBuiltupArea.toFixed(2),
    max_building_height_m: maxBuildingHeight.toFixed(2),
    max_floors: maxFloors,
    permissible_footprint_sqm: permissibleFootprint.toFixed(2)
  };

  console.log("✅ Permissions Calculated:", result);

  // Save full data with result to file
  const filePath = path.join(__dirname, 'submissions.json');
  let submissions = [];
  if (fs.existsSync(filePath)) {
    try {
      submissions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      console.error("❌ Error reading existing file:", err);
    }
  }

  submissions.push({
    timestamp: new Date().toISOString(),
    input: data,
    output: result
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    console.log("💾 Data + permissions saved to submissions.json");
    res.status(200).json({ message: 'Data processed and saved!', result });
  } catch (err) {
    console.error("❌ Error writing to file:", err);
    res.status(500).json({ message: 'Error saving data.' });
  }
});

// Authentication Routes
app.post('/auth/register', (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const result = registerUser({ fullName, email, password });

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const result = loginUser(email, password);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});

// Get all users (for testing - remove in production)
app.get('/auth/users', (req, res) => {
  res.status(200).json({ users: getAllUsers() });
});

// Optional test route
app.get('/test', (req, res) => {
  res.send("Server is working on port 9000!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Auth endpoints: POST /auth/register, POST /auth/login`);
});
