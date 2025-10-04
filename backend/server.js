require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

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
      message: 'Database connected successfully!',
      time: result.rows[0].current_time,
      database: 'PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
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
        phone VARCHAR(50),
        admin_name VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        temporary_password VARCHAR(100),
        login_url VARCHAR(500)
      );
    `;
    
    await pool.query(query);
    res.json({ success: true, message: 'Schools table created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Basic school registration
app.post('/api/schools/register', async (req, res) => {
  try {
    const { name, email, country, region, phone, admin_name } = req.body;
    
    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const loginUrl = 'https://trendwaveconnect.vercel.app/auth/login';
    
    const result = await pool.query(
      `INSERT INTO schools (name, email, country, region, phone, admin_name, temporary_password, login_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, email, country, region, phone, admin_name, tempPassword, loginUrl]
    );
    
    console.log('School registered:', result.rows[0].name);
    
    res.json({
      success: true,
      message: 'School registered successfully!',
      school: result.rows[0]
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'TrendWave Connect API is running!',
    endpoints: {
      testDb: '/api/test-db',
      createTables: '/api/create-tables', 
      registerSchool: '/api/schools/register'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
