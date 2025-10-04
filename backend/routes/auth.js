const express = require('express');
const { pool } = require('../models/schools');
const router = express.Router();

// SIMPLE AUTH THAT WORKS NOW
router.post('/login', async (req, res) => {
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

module.exports = router;
