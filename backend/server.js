const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (we'll get this later)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/schoolsaas';
mongoose.connect(MONGODB_URI);

// School Schema
const schoolSchema = new mongoose.Schema({
  schoolCode: { type: String, unique: true },
  name: String,
  plan: { type: String, default: 'starter' },
  adminEmail: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  schoolId: mongoose.ObjectId,
  email: String,
  password: String,
  role: String,
  name: String,
  isActive: { type: Boolean, default: true }
});

const School = mongoose.model('School', schoolSchema);
const User = mongoose.model('User', userSchema);

// Create School Endpoint
app.post('/api/admin/schools', async (req, res) => {
  try {
    const { name, adminEmail, schoolCode, plan } = req.body;
    
    const school = new School({ name, adminEmail, schoolCode, plan });
    await school.save();
    
    const hashedPassword = await bcrypt.hash('temp123', 10);
    const adminUser = new User({
      schoolId: school._id,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      name: 'School Admin'
    });
    await adminUser.save();
    
    res.json({ 
      success: true, 
      school, 
      tempPassword: 'temp123'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get All Schools
app.get('/api/admin/schools', async (req, res) => {
  const schools = await School.find();
  res.json(schools);
});

// School Login
app.post('/api/login', async (req, res) => {
  const { schoolCode, email, password } = req.body;
  
  const school = await School.findOne({ schoolCode });
  if (!school) return res.status(400).json({ error: 'School not found' });
  
  const user = await User.findOne({ schoolId: school._id, email });
  if (!user) return res.status(400).json({ error: 'User not found' });
  
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: 'Invalid password' });
  
  const token = jwt.sign(
    { userId: user._id, schoolId: school._id, role: user.role },
    'your-secret-key',
    { expiresIn: '24h' }
  );
  
  res.json({ token, user, school });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
