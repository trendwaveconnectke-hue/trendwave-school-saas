require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ PostgreSQL Database Connected');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Create schools table if not exists
const createSchoolsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY,
        school_id VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        country VARCHAR(100) NOT NULL,
        region VARCHAR(100) NOT NULL,
        phone VARCHAR(50),
        admin_name VARCHAR(255) NOT NULL,
        admin_email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reset_token VARCHAR(255),
        reset_token_expiry TIMESTAMP,
        failed_login_attempts INTEGER DEFAULT 0,
        account_locked_until TIMESTAMP,
        last_login TIMESTAMP
      );
    `;
    
    await pool.query(query);
    console.log('✅ Schools table ready');
  } catch (error) {
    console.error('❌ Error creating schools table:', error);
  }
};

// Initialize database
createSchoolsTable();

// ==================== AUTH ROUTES ====================

// REAL LOGIN ENDPOINT
app.post('/api/auth/login', async (req, res) => {
  try {
    const { school_id, email, password } = req.body;

    console.log('🔐 Login attempt:', { school_id, email });

    // For now - HARDCODE your admin account
    if (school_id === 'TWC0001' && email === 'trendwaveconnectke@gmail.com' && password === '@Dan0718#') {
      return res.json({
        success: true,
        message: '✅ Login successful!',
        data: {
          token: 'admin-token-' + Date.now(),
          school: {
            id: 'TWC0001',
            name: 'TrendWave Connect Headquarters',
            email: 'trendwaveconnectke@gmail.com',
            adminName: 'System Administrator'
          }
        }
      });
    }

    // For other schools - check database
    const result = await pool.query(
      'SELECT * FROM schools WHERE school_id = $1 AND email = $2',
      [school_id, email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid School ID, email, or password'
      });
    }

    const school = result.rows[0];

    // Simple password check (will upgrade to bcrypt later)
    if (password !== 'demo123') { // Temporary demo password
      return res.status(401).json({
        success: false,
        message: '❌ Invalid School ID, email, or password'
      });
    }

    res.json({
      success: true,
      message: '✅ Login successful!',
      data: {
        token: 'school-token-' + Date.now(),
        school: {
          id: school.school_id,
          name: school.name,
          email: school.email,
          adminName: school.admin_name
        }
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: '🔧 Server error. Please try again.'
    });
  }
});

// ==================== SCHOOL REGISTRATION ====================

app.post('/api/schools/register', async (req, res) => {
  try {
    const { name, email, country, region, phone, admin_name, admin_email } = req.body;

    // Validate required fields
    if (!name || !email || !country || !region || !admin_name || !admin_email) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Generate school ID
    const countResult = await pool.query('SELECT COUNT(*) as count FROM schools');
    const schoolId = 'TWC' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    // Insert school
    const result = await pool.query(
      `INSERT INTO schools 
       (school_id, name, email, country, region, phone, admin_name, admin_email, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING school_id, name, email, admin_name, admin_email, status`,
      [schoolId, name, email, country, region, phone, admin_name, admin_email, 'pending']
    );

    const school = result.rows[0];

    res.json({
      success: true,
      message: 'School registered successfully - pending approval',
      data: school
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === '23505') { // Unique violation
      res.status(400).json({
        success: false,
        message: 'School with this email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Registration failed'
      });
    }
  }
});

// ==================== TEST ENDPOINTS ====================

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({ 
      success: true, 
      message: '✅ Database connected successfully!',
      time: result.rows[0].current_time
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error.message 
    });
  }
});

// Get all schools
app.get('/api/schools', async (req, res) => {
  try {
    const result = await pool.query('SELECT school_id, name, email, country, region, status, created_at FROM schools ORDER BY created_at DESC');
    res.json({ 
      success: true, 
      count: result.rows.length,
      schools: result.rows 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Setup database (run once)
app.get('/api/setup-database', async (req, res) => {
  try {
    await createSchoolsTable();
    
    // Create your admin account
    await pool.query(
      `INSERT INTO schools 
       (school_id, name, email, country, region, admin_name, admin_email, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       ON CONFLICT (school_id) DO NOTHING`,
      ['TWC0001', 'TrendWave Connect Headquarters', 'trendwaveconnectke@gmail.com', 'Kenya', 'Nairobi', 'System Administrator', 'trendwaveconnectke@gmail.com', 'active']
    );
    
    res.json({ 
      success: true, 
      message: '✅ Database setup completed! Admin account TWC0001 created.' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== ROOT & HEALTH ====================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 TrendWave Connect API is running!',
    version: '1.0.0',
    endpoints: {
      testDb: 'GET /api/test-db',
      login: 'POST /api/auth/login',
      registerSchool: 'POST /api/schools/register',
      listSchools: 'GET /api/schools',
      setupDatabase: 'GET /api/setup-database'
    },
    database: 'PostgreSQL',
    status: 'Active'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'TrendWave Backend',
    database: 'Connected'
  });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🎓 TrendWave Connect Backend Started!
📍 Port: ${PORT}
🗄️  Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
🚀 Ready for authentication!

📋 Available Endpoints:
   http://localhost:${PORT}/api/test-db
   http://localhost:${PORT}/api/auth/login
   http://localhost:${PORT}/api/schools/register
   http://localhost:${PORT}/api/setup-database
  `);
});
