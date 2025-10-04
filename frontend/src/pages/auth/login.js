const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../models/schools');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'trendwave-secure-key-2024';

// REAL LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  try {
    const { school_id, email, password } = req.body;

    console.log('🔐 REAL LOGIN ATTEMPT:', { school_id, email });

    // Validate required fields
    if (!school_id || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'School ID, email, and password are required'
      });
    }

    // Check if school exists with matching school_id AND email
    const result = await pool.query(
      'SELECT * FROM schools WHERE school_id = $1 AND email = $2',
      [school_id, email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid School ID, email, or password'
      });
    }

    const school = result.rows[0];

    // Check if school has password_hash (properly set up)
    if (!school.password_hash) {
      return res.status(401).json({
        success: false,
        message: 'School account not properly configured. Please contact support.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, school.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid School ID, email, or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        schoolId: school.school_id,
        email: school.email,
        schoolName: school.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token: token,
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
      message: 'Server error during login'
    });
  }
});

module.exports = router;
