require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

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
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({ 
      success: true, 
      message: '✅ Database connected successfully!',
      time: result.rows[0].current_time,
      database: 'PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: '❌ Database connection failed',
      details: error.message 
    });
  }
});

// Create schools table if not exists
app.get('/api/create-tables', async (req, res) => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        country VARCHAR(100) NOT NULL,
        region VARCHAR(100) NOT NULL,
        city VARCHAR(100),
        phone VARCHAR(50),
        admin_name VARCHAR(255) NOT NULL,
        admin_email VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        temporary_password VARCHAR(100),
        login_url VARCHAR(500),
        school_type VARCHAR(100)
      );
    `;
    
    await pool.query(query);
    res.json({ 
      success: true, 
      message: '✅ Schools table created successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// School registration endpoint
app.post('/api/schools/register', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      country, 
      region, 
      city, 
      phone, 
      admin_name, 
      admin_email,
      school_type 
    } = req.body;

    // Validate required fields
    if (!name || !email || !country || !region || !admin_name || !admin_email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate email
    if (!validator.isEmail(admin_email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
    const loginUrl = 'https://trendwaveconnect.vercel.app/auth/login';

    // Insert school into database
    const result = await pool.query(
      `INSERT INTO schools 
       (name, email, country, region, city, phone, admin_name, admin_email, temporary_password, login_url, school_type) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING id, name, email, admin_name, admin_email, status, created_at`,
      [name, email, country, region, city, phone, admin_name, admin_email, tempPassword, loginUrl, school_type]
    );

    const school = result.rows[0];

    // TODO: Send email with login details (will implement later)
    console.log('📧 School registered - Email would be sent:', {
      school: school.name,
      admin_email: school.admin_email,
      tempPassword: tempPassword,
      loginUrl: loginUrl
    });

    res.json({
      success: true,
      message: '🎉 School registered successfully! Check your email for login details.',
      data: {
        id: school.id,
        name: school.name,
        admin_email: school.admin_email,
        status: school.status,
        next_step: 'Check your email for login instructions'
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    if (error.code === '23505') { // Unique violation
      res.status(400).json({
        success: false,
        message: 'School with this email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message
      });
    }
  }
});

// Get all schools (for testing)
app.get('/api/schools', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, country, region, status, created_at FROM schools ORDER BY created_at DESC');
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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 TrendWave Connect API is running!',
    version: '1.0.0',
    endpoints: {
      testDb: 'GET /api/test-db',
      createTables: 'GET /api/create-tables',
      registerSchool: 'POST /api/schools/register',
      listSchools: 'GET /api/schools'
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
    service: 'TrendWave Backend' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
🎓 TrendWave Connect Backend Started!
📍 Port: ${PORT}
🗄️  Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
🚀 Ready for schools registration!
  `);
});
