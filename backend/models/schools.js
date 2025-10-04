const { Pool } = require('pg');

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

module.exports = { pool, createSchoolsTable };
