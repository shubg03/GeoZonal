# 🔐 Authentication System Documentation

## Overview

Complete authentication system with Sign Up, Sign In, and persistent sessions using localStorage.

## Backend Implementation

### Auth Endpoints

#### 1. **POST /auth/register** - User Registration

```javascript
// Request
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Success Response (201)
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "1234567890",
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-10-03T10:30:00.000Z"
  }
}

// Error Response (400)
{
  "success": false,
  "message": "User already exists with this email"
}
```

#### 2. **POST /auth/login** - User Login

```javascript
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Success Response (200)
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "1234567890",
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-10-03T10:30:00.000Z"
  }
}

// Error Response (401)
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### 3. **GET /auth/users** - Get All Users (Testing Only)

```javascript
// Response
{
  "users": [
    {
      "id": "1234567890",
      "fullName": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-10-03T10:30:00.000Z"
    }
  ]
}
```

### File Structure

```
backend/
├── index.js                 # Main server with auth routes
└── middleware/
    ├── auth.js             # Authentication logic (registration, login)
    └── check-permit.js     # FSI validation logic
```

---

## Frontend Implementation

### Sign Up Flow

1. **User fills form** (`/signup`)

   - Full Name (required)
   - Email (required, validated)
   - Password (required, min 6 characters)
   - Confirm Password (must match)

2. **Form validation**

   - Real-time error clearing
   - Email format validation
   - Password match check

3. **API Call**

   ```javascript
   fetch("http://localhost:9000/auth/register", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ fullName, email, password }),
   });
   ```

4. **Success Flow**

   - User data stored in `localStorage`
   - Success message displayed
   - Redirect to `/signin` after 2 seconds

5. **Error Handling**
   - Display error message (e.g., "User already exists")
   - Form remains filled for correction

---

### Sign In Flow

1. **User fills form** (`/signin`)

   - Email (required)
   - Password (required)

2. **API Call**

   ```javascript
   fetch("http://localhost:9000/auth/login", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ email, password }),
   });
   ```

3. **Success Flow**

   - User data stored in `localStorage.user`
   - Authentication flag set in `localStorage.isAuthenticated = 'true'`
   - Success message displayed
   - Redirect to `/` (Dashboard) after 1.5 seconds

4. **Error Handling**
   - Display error message (e.g., "Invalid email or password")
   - Form cleared for retry

---

### Session Persistence

#### LocalStorage Structure

```javascript
// After successful login
localStorage.setItem(
  "user",
  JSON.stringify({
    id: "1234567890",
    fullName: "John Doe",
    email: "john@example.com",
    createdAt: "2025-10-03T10:30:00.000Z",
  })
);
localStorage.setItem("isAuthenticated", "true");
```

#### Navbar Authentication State

- **Logged Out**: Shows "Sign In" + "Sign Up" buttons
- **Logged In**: Shows "Welcome, [Name]" + "Sign Out" button

```javascript
// Check auth status on mount
useEffect(() => {
  const userData = localStorage.getItem("user");
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (userData && isAuthenticated === "true") {
    setUser(JSON.parse(userData));
  }
}, []);
```

#### Sign Out

```javascript
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  setUser(null);
  navigate("/");
};
```

---

## UI Components

### Success/Error Messages

#### CSS Classes

```css
.auth-message {
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
  animation: slideInDown 0.3s ease-out;
}

.auth-message.success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.auth-message.error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid #fca5a5;
}
```

### Navbar User Display

```css
.user-welcome {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--gray-700);
  padding: 0 1rem;
  animation: fadeIn 0.3s ease-out;
}

.btn-nav-signout {
  padding: 0.625rem 1.5rem;
  background: linear-gradient(135deg, var(--accent-500), var(--accent-600));
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
}
```

---

## Routing Updates

### App.js Routes

```javascript
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/validate" element={<Validate />} /> {/* NEW */}
  <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/about" element={<About />} />
  <Route path="/how-it-works" element={<HowItWorks />} />
</Routes>
```

### Navbar Links

```javascript
<nav className="navbar-nav">
  <Link to="/">Dashboard</Link>
  <Link to="/validate">Validate</Link> {/* NEW */}
  <Link to="/about">About</Link>
  <Link to="/how-it-works">How It Works</Link>
</nav>
```

---

## Validation Page (`/validate`)

### Purpose

Dedicated page for the Interactive Validation Map - the heart of the project.

### Features

1. **Hero Section**

   - Clear title and description
   - Feature badges (Real-time Validation, FSI Regulations, Instant Results)

2. **Instructions Section**

   - 4-step guide (Search → Draw → Enter → Results)
   - Visual step numbers with cards

3. **Map Section**

   - Full MapSection component
   - Interactive plot drawing
   - FSI compliance validation

4. **Info Section**
   - 3 feature cards
   - Detailed explanations

### Dashboard Integration

```javascript
// Dashboard now has "Start Validation" button
<button className="btn-validate-primary" onClick={() => navigate("/validate")}>
  <svg>...</svg>
  Start Validation
</button>
```

---

## Database Note

### Current Implementation

- **In-Memory Storage**: Uses JavaScript array (`users = []`)
- Data persists only while server is running
- Lost on server restart

### Recommended Production Setup

```javascript
// Option 1: MongoDB
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String, // Use bcrypt hash!
  createdAt: { type: Date, default: Date.now },
});

// Option 2: PostgreSQL with Sequelize
const User = sequelize.define("User", {
  fullName: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING, // Use bcrypt hash!
});

// Option 3: JSON File (simple but not recommended)
const fs = require("fs");
const users = JSON.parse(fs.readFileSync("users.json", "utf8"));
```

### Security Improvements for Production

```javascript
// 1. Hash passwords with bcrypt
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(password, 10);

// 2. Use JWT tokens instead of localStorage
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "7d" });

// 3. HTTP-only cookies for token storage
res.cookie("token", token, { httpOnly: true, secure: true });

// 4. Environment variables for secrets
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;
```

---

## Testing the Authentication

### 1. Register a New User

```bash
curl -X POST http://localhost:9000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login with Created User

```bash
curl -X POST http://localhost:9000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. View All Users (Testing)

```bash
curl http://localhost:9000/auth/users
```

---

## User Flow Summary

### New User Journey

1. Visit homepage → Click "Sign Up"
2. Fill registration form → Submit
3. Account created → Redirected to Sign In
4. Enter credentials → Click "Sign In"
5. Logged in → Welcome message in navbar
6. Click "Validate" or "Start Validation" → Access map
7. Draw plot → Enter road width → Get results
8. Click "Sign Out" when done

### Returning User Journey

1. Visit homepage → Click "Sign In"
2. Enter saved credentials → Submit
3. Logged in → See "Welcome, [Name]" in navbar
4. Navigate directly to "/validate"
5. Use map for validation
6. Data persists in localStorage until sign out

---

## File Changes Summary

### New Files

- `backend/middleware/auth.js` - Authentication logic
- `frontendd/src/pages/Validate.js` - Dedicated validation page
- `frontendd/src/styles/Validate.css` - Validation page styles

### Modified Files

- `backend/index.js` - Added 3 auth endpoints
- `frontendd/src/App.js` - Added /validate route
- `frontendd/src/pages/SignUp.js` - Backend integration + messages
- `frontendd/src/pages/SignIn.js` - Backend integration + messages
- `frontendd/src/pages/Dashboard.js` - Removed MapSection, added Validate CTA
- `frontendd/src/components/common/Navbar.js` - User state + Validate link
- `frontendd/src/styles/Auth.css` - Success/error message styles
- `frontendd/src/styles/Navbar.css` - User welcome + sign out button
- `frontendd/src/styles/Dashboard.css` - Validate CTA + map preview sections

---

## Environment Setup

### Backend (Port 9000)

```bash
cd backend
npm start
# Server running at http://localhost:9000
```

### Frontend (Port 3000)

```bash
cd frontendd
npm start
# App running at http://localhost:3000
```

---

## Next Steps for Production

1. **Database Integration**

   - Set up MongoDB/PostgreSQL
   - Migrate from in-memory storage
   - Add proper schemas/models

2. **Password Security**

   - Install bcrypt: `npm install bcrypt`
   - Hash passwords before storing
   - Compare hashes on login

3. **JWT Authentication**

   - Install jsonwebtoken: `npm install jsonwebtoken`
   - Generate tokens on login
   - Protect API routes with middleware

4. **Protected Routes**

   - Create ProtectedRoute component
   - Redirect to /signin if not authenticated
   - Store tokens securely (HTTP-only cookies)

5. **Session Management**

   - Add token refresh mechanism
   - Implement auto-logout on expiry
   - Add "Remember Me" functionality

6. **Testing**
   - Write unit tests for auth functions
   - Test API endpoints with Postman
   - Add E2E tests for user flows

---

## Support

For questions or issues:

- Check browser console for errors
- Verify backend is running on port 9000
- Check Network tab for API call status
- Confirm localStorage contains user data

**All Done! 🎉**
Authentication system is fully functional with persistent sessions!
