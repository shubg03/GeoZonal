# GeoZonal Validator - Complete Frontend Overhaul

A modern, full-stack web application for validating building compliance with geospatial zoning regulations.

## 🎯 Project Overview

**GeoZonal Validator** is a smart building compliance checker that helps government officials, urban planners, architects, and property owners verify if buildings meet FSI (Floor Space Index) regulations and zoning laws in real-time.

### Simple Workflow:

1. Users register or log in to access the system
2. Interactive map interface (via Leaflet.js) loads for location-based interactions
3. Users search for locations and draw plot polygons manually
4. System provides building information and validates against predefined rules
5. Backend calculates permissible FSI, footprint, height, and floor count
6. Results show if building is legal/valid or illegal/invalid

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js v5.1.0
- **Dependencies:**
  - cors v2.8.5
  - body-parser v2.2.0
  - nodemon v3.1.10

### Frontend

- **Framework:** React v19.1.1
- **Routing:** React Router DOM v7.9.3
- **State Management:** React Hooks (useState, useRef, useEffect)
- **Mapping:**
  - Leaflet v1.9.4
  - React-Leaflet v5.0.0
- **Geospatial:** @turf/turf v7.2.0
- **HTTP Client:** Axios v1.12.2
- **Styling:** Custom CSS with Design System

## 📁 New Project Structure

```
GeoZonal/
├── backend/
│   ├── index.js                 # Express server (Port 9000)
│   ├── package.json
│   ├── submissions.json         # Data storage
│   └── middleware/
│       └── check-permit.js      # FSI calculation logic
│
└── frontendd/
    ├── package.json
    ├── public/
    └── src/
        ├── App.js               # Main app with routing
        ├── App.css
        ├── index.js
        ├── index.css
        ├── assets/
        ├── components/
        │   ├── MapSection.js    # Enhanced map component
        │   ├── MapValidator.js  # Original (kept for reference)
        │   └── common/
        │       ├── Navbar.js    # Modern navigation
        │       └── Footer.js    # Footer component
        ├── pages/
        │   ├── Dashboard.js     # Main dashboard page
        │   ├── SignIn.js        # Sign in page
        │   ├── SignUp.js        # Sign up page
        │   ├── About.js         # About page
        │   └── HowItWorks.js    # How it works page
        └── styles/
            ├── theme.css        # Design system variables
            ├── Navbar.css
            ├── Footer.css
            ├── MapSection.css
            ├── Dashboard.css
            ├── Auth.css
            ├── About.css
            └── HowItWorks.css
```

## 🎨 Design System

### Color Palette

- **Primary:** Professional Blue (#3b82f6 - #1e3a8a)
- **Secondary:** Modern Teal (#14b8a6 - #134e4a)
- **Accent:** Vibrant Orange (#f97316 - #7c2d12)
- **Neutral:** Gray scale (#f9fafb - #111827)
- **Semantic:** Success/Error/Warning states

### Typography

- **Font Family:** System fonts (Segoe UI, Roboto, etc.)
- **Scale:** H1 (3.5rem) → Caption (0.875rem)

### Components

- Modern glassmorphism effects
- Smooth animations and transitions
- Responsive design (mobile-first approach)
- Accessible WCAG compliant components

## 🚀 Features

### Frontend Features

1. **Routing & Navigation**

   - React Router integration
   - Multi-page structure
   - Persistent navbar with auth buttons
   - Footer with links

2. **Dashboard Page**

   - Hero section with statistics
   - Feature cards
   - Large interactive map (700px height)
   - Enhanced controls panel
   - Real-time validation results
   - CTA sections

3. **Authentication Pages**

   - Modern sign-in/sign-up forms
   - Floating labels
   - Social login buttons (UI only)
   - Form validation
   - Smooth animations

4. **Map Features**

   - Significantly larger map display
   - Search with OpenStreetMap Nominatim
   - Polygon drawing tools
   - Automatic area calculation
   - Location markers
   - Responsive zoom controls

5. **Validation System**
   - Real-time FSI calculation
   - Height and floor limit checks
   - Ground coverage calculation
   - Legal/Illegal status indicator
   - Comprehensive results display

### Backend Features (Preserved)

- REST API endpoints
- FSI calculation engine
- Zoning rules validation
- JSON data persistence
- CORS enabled

## 📋 API Endpoints

### POST `/submit`

Validate building compliance

**Request Body:**

```json
{
  "plot": { "area": 1000.0 },
  "road": { "width": 12.0 }
}
```

**Response:**

```json
{
  "message": "Data processed and saved!",
  "result": {
    "permissible_fsi": 1.3,
    "plot_area_sqm": "1000.00",
    "max_builtup_area_sqm": "1300.00",
    "max_building_height_m": "18.00",
    "max_floors": 6,
    "permissible_footprint_sqm": "650.00"
  }
}
```

### GET `/test`

Health check endpoint

## 🏃 Running the Project

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
# Server runs on http://localhost:9000
```

### Frontend Setup

```bash
cd frontendd
npm install
npm start
# App runs on http://localhost:3000
```

## 🌐 Routes

- `/` - Dashboard (Main page with map)
- `/signin` - Sign In page
- `/signup` - Sign Up page
- `/about` - About page
- `/how-it-works` - How It Works page

## 📊 FSI Regulations

| Road Width | Permissible FSI | Height Factor |
| ---------- | --------------- | ------------- |
| ≤ 9m       | 1.1             | 1.5 × Width   |
| 9m - 12m   | 1.3             | 1.5 × Width   |
| 12m - 18m  | 1.5             | 1.5 × Width   |
| > 18m      | 2.0             | 1.5 × Width   |

**Additional Rules:**

- Coverage Ratio: 65% of plot area
- Floor Height: 3.0m
- Automatic floor calculation

## 🎯 Key Improvements

### Before vs After

| Aspect         | Before         | After                        |
| -------------- | -------------- | ---------------------------- |
| **Routing**    | Single page    | Multi-page with React Router |
| **Map Size**   | 500px          | 700px (40% larger)           |
| **Design**     | Basic CSS      | Modern design system         |
| **Navigation** | Simple buttons | Professional navbar          |
| **Forms**      | Basic inputs   | Creative floating labels     |
| **Auth**       | Modal popups   | Dedicated pages              |
| **Responsive** | Limited        | Fully responsive             |
| **Animations** | None           | Smooth transitions           |

## 🔒 Backend Integration

**✅ All existing backend functionality preserved:**

- API endpoints unchanged
- Data structures maintained
- Business logic intact
- Authentication ready (endpoints available)
- CORS configuration preserved

## 🎨 Design Highlights

1. **Glassmorphism** - Modern translucent effects
2. **Gradient Backgrounds** - Professional color transitions
3. **Micro-interactions** - Hover states and animations
4. **Card-based Layout** - Clean, organized content
5. **Consistent Spacing** - Design system variables
6. **Accessibility** - WCAG compliant components

## 📱 Responsive Breakpoints

- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px

## 🚧 Future Enhancements

- [ ] Backend authentication implementation
- [ ] User dashboard with saved validations
- [ ] Export reports as PDF
- [ ] Advanced map features (layers, measurement tools)
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA)

## 👥 Target Audience

- Government officials
- Urban planners
- Architects
- Property owners
- Real estate developers
- Common citizens

## 📄 License

All rights reserved © 2025 GeoZonal Validator

## 🤝 Contributing

For contributions, please contact the development team.

---

**Made with ♥ for better urban planning**
