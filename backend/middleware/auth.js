const users = []; // In-memory storage (replace with database later)

// User registration
function registerUser(userData) {
  const { fullName, email, password } = userData;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, message: 'User already exists with this email' };
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    fullName,
    email,
    password, // In production, hash this with bcrypt!
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return { success: true, message: 'User registered successfully', user: userWithoutPassword };
}

// User login
function loginUser(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return { success: true, message: 'Login successful', user: userWithoutPassword };
}

// Get all users (for testing - remove in production)
function getAllUsers() {
  return users.map(({ password, ...user }) => user);
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers
};
