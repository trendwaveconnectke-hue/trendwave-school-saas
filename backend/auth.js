const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('./models/schools');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'trendwave-secure-key-2024';

// Generate unique school ID
const generateSchoolId = async () => {
  const result = await pool.query('SELECT COUNT(*) as count FROM schools');
  const count = parseInt(result.rows[0].count) + 1;
  return `TWC${String(count).padStart(4, '0')}`;
};

// School Registration
const registerSchool = async (req, res) => {
  try {
    const { name, email, country, region, phone, admin_name, admin_email } = req.body;
    
    // Validate required fields
    if (!name || !email || !country || !region || !admin_name || !admin_email) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists
    const existingSchool = await pool.query(
      'SELECT * FROM schools WHERE email = $1 OR admin_email = $2',
      [email, admin_email]
    );

    if (existingSchool.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'School with this email already exists'
      });
    }

    // Generate school ID and temporary password
    const schoolId = await generateSchoolId();
    const tempPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Insert school
    const result = await pool.query(
      `INSERT INTO schools 
       (school_id, name, email, country, region, phone, admin_name, admin_email, password_hash, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING school_id, name, email, admin_name, admin_email, status`,
      [schoolId, name, email, country, region, phone, admin_name, admin_email, hashedPassword, 'active']
    );

    const school = result.rows[0];

    // TODO: Send email with login credentials
    console.log('New school registered:', {
      schoolId: school.school_id,
      email: school.email,
      tempPassword: tempPassword
    });

    res.json({
      success: true,
      message: 'School registered successfully',
      data: {
        schoolId: school.school_id,
        name: school.name,
        adminEmail: school.admin_email,
        tempPassword: tempPassword
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
};

// School Login
const loginSchool = async (req, res) => {
  try {
    const { school_id, email, password } = req.body;

    // Validate required fields
    if (!school_id || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'School ID, email, and password are required'
      });
    }

    // Check if account is locked
    const lockedCheck = await pool.query(
      'SELECT account_locked_until FROM schools WHERE school_id = $1 AND email = $2',
      [school_id, email]
    );

    if (lockedCheck.rows.length > 0 && lockedCheck.rows[0].account_locked_until) {
      if (new Date() < new Date(lockedCheck.rows[0].account_locked_until)) {
        return res.status(423).json({
          success: false,
          message: 'Account temporarily locked due to too many failed attempts'
        });
      }
    }

    // Get school with matching school_id AND email
    const result = await pool.query(
      `SELECT * FROM schools WHERE school_id = $1 AND email = $2`,
      [school_id, email]
    );

    if (result.rows.length === 0) {
      // Increment failed attempts
      await pool.query(
        'UPDATE schools SET failed_login_attempts = COALESCE(failed_login_attempts, 0) + 1 WHERE school_id = $1 AND email = $2',
        [school_id, email]
      );

      return res.status(401).json({
        success: false,
        message: 'Invalid School ID, email, or password'
      });
    }

    const school = result.rows[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, school.password_hash);

    if (!isPasswordValid) {
      // Increment failed attempts and check for lockout
      const newAttempts = (school.failed_login_attempts || 0) + 1;
      
      if (newAttempts >= 5) {
        const lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        await pool.query(
          'UPDATE schools SET failed_login_attempts = $1, account_locked_until = $2 WHERE school_id = $3',
          [newAttempts, lockUntil, school_id]
        );
        
        return res.status(423).json({
          success: false,
          message: 'Account locked for 30 minutes due to too many failed attempts'
        });
      }

      await pool.query(
        'UPDATE schools SET failed_login_attempts = $1 WHERE school_id = $2',
        [newAttempts, school_id]
      );

      return res.status(401).json({
        success: false,
        message: 'Invalid School ID, email, or password'
      });
    }

    // Reset failed attempts on successful login
    await pool.query(
      'UPDATE schools SET failed_login_attempts = 0, account_locked_until = NULL, last_login = CURRENT_TIMESTAMP WHERE school_id = $1',
      [school_id]
    );

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
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

// Password Reset Request
const requestPasswordReset = async (req, res) => {
  try {
    const { school_id, email } = req.body;

    if (!school_id || !email) {
      return res.status(400).json({
        success: false,
        message: 'School ID and email are required'
      });
    }

    // Verify school exists with matching school_id AND email
    const result = await pool.query(
      'SELECT * FROM schools WHERE school_id = $1 AND email = $2',
      [school_id, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No school found with provided School ID and email'
      });
    }

    const school = result.rows[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    // Save reset token
    await pool.query(
      'UPDATE schools SET reset_token = $1, reset_token_expiry = $2 WHERE school_id = $3',
      [resetToken, tokenExpiry, school_id]
    );

    // TODO: Send email with reset link
    const resetLink = `https://trendwave-school-saas.vercel.app/auth/reset-password?token=${resetToken}`;
    
    console.log('Password reset requested:', {
      schoolId: school_id,
      email: email,
      resetLink: resetLink
    });

    res.json({
      success: true,
      message: 'Password reset instructions sent to your email',
      data: {
        resetLink: resetLink // Remove this in production, only for testing
      }
    });

  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset request failed'
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Reset token and new password are required'
      });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Find school with valid reset token
    const result = await pool.query(
      'SELECT * FROM schools WHERE reset_token = $1 AND reset_token_expiry > $2',
      [token, new Date()]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    const school = result.rows[0];

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await pool.query(
      'UPDATE schools SET password_hash = $1, reset_token = NULL, reset_token_expiry = NULL, failed_login_attempts = 0 WHERE school_id = $2',
      [hashedPassword, school.school_id]
    );

    console.log('Password reset successful for:', school.school_id);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed'
    });
  }
};

module.exports = {
  registerSchool,
  loginSchool,
  requestPasswordReset,
  resetPassword
};
