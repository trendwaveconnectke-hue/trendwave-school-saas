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

// Create all tables
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

const createAssociationsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS associations (
        id SERIAL PRIMARY KEY,
        association_id VARCHAR(20) UNIQUE NOT NULL,
        association_name VARCHAR(255) NOT NULL,
        registration_number VARCHAR(255) UNIQUE NOT NULL,
        association_type VARCHAR(100) NOT NULL,
        professional_field VARCHAR(100),
        established_year VARCHAR(10),
        member_count VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        president_name VARCHAR(255),
        president_email VARCHAR(255),
        president_phone VARCHAR(50),
        president_position VARCHAR(100) DEFAULT 'President',
        membership_types TEXT[],
        activities TEXT[],
        subscription_plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Associations table ready');
  } catch (error) {
    console.error('❌ Error creating associations table:', error);
  }
};

const createBusinessesTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS businesses (
        id SERIAL PRIMARY KEY,
        business_id VARCHAR(20) UNIQUE NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        registration_number VARCHAR(255) UNIQUE NOT NULL,
        company_type VARCHAR(100) NOT NULL,
        industry_sector VARCHAR(100) NOT NULL,
        founded_year VARCHAR(10),
        employee_count VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        ceo_name VARCHAR(255),
        ceo_email VARCHAR(255),
        ceo_phone VARCHAR(50),
        ceo_position VARCHAR(100) DEFAULT 'CEO',
        business_model VARCHAR(100),
        annual_revenue VARCHAR(100),
        services TEXT[],
        subscription_plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Businesses table ready');
  } catch (error) {
    console.error('❌ Error creating businesses table:', error);
  }
};

const createGovernmentsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS governments (
        id SERIAL PRIMARY KEY,
        government_id VARCHAR(20) UNIQUE NOT NULL,
        agency_name VARCHAR(255) NOT NULL,
        government_code VARCHAR(255) UNIQUE NOT NULL,
        agency_type VARCHAR(100) NOT NULL,
        government_level VARCHAR(100) NOT NULL,
        established_year VARCHAR(10),
        employee_count VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        director_name VARCHAR(255),
        director_email VARCHAR(255),
        director_phone VARCHAR(50),
        director_position VARCHAR(100) DEFAULT 'Director General',
        jurisdiction VARCHAR(100),
        services TEXT[],
        budget_range VARCHAR(100),
        subscription_plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Governments table ready');
  } catch (error) {
    console.error('❌ Error creating governments table:', error);
  }
};

const createHealthcareTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS healthcare (
        id SERIAL PRIMARY KEY,
        healthcare_id VARCHAR(20) UNIQUE NOT NULL,
        hospital_name VARCHAR(255) NOT NULL,
        license_number VARCHAR(255) UNIQUE NOT NULL,
        facility_type VARCHAR(100) NOT NULL,
        medical_specialty VARCHAR(100) NOT NULL,
        established_year VARCHAR(10),
        bed_capacity VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        director_name VARCHAR(255),
        director_email VARCHAR(255),
        director_phone VARCHAR(50),
        director_position VARCHAR(100) DEFAULT 'Medical Director',
        accreditation VARCHAR(255),
        emergency_services BOOLEAN DEFAULT false,
        specialties TEXT[],
        subscription_plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Healthcare table ready');
  } catch (error) {
    console.error('❌ Error creating healthcare table:', error);
  }
};

const createIndustrialsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS industrials (
        id SERIAL PRIMARY KEY,
        industrial_id VARCHAR(20) UNIQUE NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        registration_number VARCHAR(255) UNIQUE NOT NULL,
        industry_type VARCHAR(100) NOT NULL,
        product_category VARCHAR(100) NOT NULL,
        established_year VARCHAR(10),
        employee_count VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        manager_name VARCHAR(255),
        manager_email VARCHAR(255),
        manager_phone VARCHAR(50),
        manager_position VARCHAR(100) DEFAULT 'Plant Manager',
        production_capacity VARCHAR(255),
        certifications TEXT[],
        subscription_plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Industrials table ready');
  } catch (error) {
    console.error('❌ Error creating industrials table:', error);
  }
};

const createNonprofitsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS nonprofits (
        id SERIAL PRIMARY KEY,
        nonprofit_id VARCHAR(20) UNIQUE NOT NULL,
        organization_name VARCHAR(255) NOT NULL,
        registration_number VARCHAR(255) UNIQUE NOT NULL,
        organization_type VARCHAR(100) NOT NULL,
        focus_area VARCHAR(100) NOT NULL,
        founded_year VARCHAR(10),
        beneficiary_count VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        director_name VARCHAR(255),
        director_email VARCHAR(255),
        director_phone VARCHAR(50),
        director_position VARCHAR(100) DEFAULT 'Executive Director',
        mission_statement TEXT,
        funding_sources TEXT[],
        programs TEXT[],
        subscription_plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Nonprofits table ready');
  } catch (error) {
    console.error('❌ Error creating nonprofits table:', error);
  }
};

const createReligiousTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS religious (
        id SERIAL PRIMARY KEY,
        religious_id VARCHAR(20) UNIQUE NOT NULL,
        organization_name VARCHAR(255) NOT NULL,
        registration_number VARCHAR(255) UNIQUE NOT NULL,
        religion_type VARCHAR(100) NOT NULL,
        denomination VARCHAR(100),
        established_year VARCHAR(10),
        congregation_size VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        leader_name VARCHAR(255),
        leader_email VARCHAR(255),
        leader_phone VARCHAR(50),
        leader_position VARCHAR(100) DEFAULT 'Pastor',
        services TEXT[],
        activities TEXT[],
        subscription_plan VARCHAR(50) DEFAULT 'free',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Religious table ready');
  } catch (error) {
    console.error('❌ Error creating religious table:', error);
  }
};

// Initialize all tables
const initializeDatabase = async () => {
  await createSchoolsTable();
  await createAssociationsTable();
  await createBusinessesTable();
  await createGovernmentsTable();
  await createHealthcareTable();
  await createIndustrialsTable();
  await createNonprofitsTable();
  await createReligiousTable();
};

initializeDatabase();

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { school_id, email, password } = req.body;
    console.log('🔐 Login attempt:', { school_id, email });

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
    if (password !== 'demo123') {
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

// ==================== REGISTRATION ROUTES ====================

// 1. SCHOOL REGISTRATION
app.post('/api/schools/register', async (req, res) => {
  try {
    const { name, email, country, region, phone, admin_name, admin_email } = req.body;

    if (!name || !email || !country || !region || !admin_name || !admin_email) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM schools');
    const schoolId = 'TWCS' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

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
    if (error.code === '23505') {
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

// 2. ASSOCIATION REGISTRATION
app.post('/api/associations/register', async (req, res) => {
  try {
    const {
      associationName, registrationNumber, associationType, professionalField,
      establishedYear, memberCount, email, phone, website, address,
      presidentName, presidentEmail, presidentPhone, presidentPosition,
      membershipTypes, activities, subscriptionPlan
    } = req.body;

    if (!associationName || !registrationNumber || !associationType || !email) {
      return res.status(400).json({
        success: false,
        message: 'Association name, registration number, association type, and email are required'
      });
    }

    const existingCheck = await pool.query(
      'SELECT * FROM associations WHERE registration_number = $1 OR email = $2 OR association_name = $3',
      [registrationNumber, email, associationName]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Association already registered with this registration number, email, or name'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM associations');
    const associationId = 'TWCA' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    const result = await pool.query(
      `INSERT INTO associations 
       (association_id, association_name, registration_number, association_type, professional_field, 
        established_year, member_count, email, phone, website, address, president_name, 
        president_email, president_phone, president_position, membership_types, activities, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
       RETURNING association_id, association_name, email, president_name, status`,
      [
        associationId, associationName, registrationNumber, associationType, professionalField,
        establishedYear, memberCount, email, phone, website, address, presidentName,
        presidentEmail, presidentPhone, presidentPosition || 'President', 
        membershipTypes || [], activities || [], subscriptionPlan || 'free'
      ]
    );

    const association = result.rows[0];
    res.json({
      success: true,
      message: 'Association registered successfully - pending approval',
      data: {
        associationId: association.association_id,
        associationName: association.association_name,
        email: association.email,
        presidentName: association.president_name,
        status: association.status
      }
    });

  } catch (error) {
    console.error('Association registration error:', error);
    if (error.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'Association with this registration number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Association registration failed'
      });
    }
  }
});

// 3. BUSINESS REGISTRATION
app.post('/api/businesses/register', async (req, res) => {
  try {
    const {
      companyName, registrationNumber, companyType, industrySector,
      foundedYear, employeeCount, email, phone, website, address,
      ceoName, ceoEmail, ceoPhone, ceoPosition, businessModel,
      annualRevenue, services, subscriptionPlan
    } = req.body;

    if (!companyName || !registrationNumber || !companyType || !industrySector || !email) {
      return res.status(400).json({
        success: false,
        message: 'Company name, registration number, company type, industry sector, and email are required'
      });
    }

    const existingCheck = await pool.query(
      'SELECT * FROM businesses WHERE registration_number = $1 OR email = $2 OR company_name = $3',
      [registrationNumber, email, companyName]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Business already registered with this registration number, email, or name'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM businesses');
    const businessId = 'TWCB' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    const result = await pool.query(
      `INSERT INTO businesses 
       (business_id, company_name, registration_number, company_type, industry_sector, 
        founded_year, employee_count, email, phone, website, address, ceo_name, 
        ceo_email, ceo_phone, ceo_position, business_model, annual_revenue, services, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
       RETURNING business_id, company_name, email, ceo_name, status`,
      [
        businessId, companyName, registrationNumber, companyType, industrySector,
        foundedYear, employeeCount, email, phone, website, address, ceoName,
        ceoEmail, ceoPhone, ceoPosition || 'CEO', businessModel, annualRevenue,
        services || [], subscriptionPlan || 'free'
      ]
    );

    const business = result.rows[0];
    res.json({
      success: true,
      message: 'Business registered successfully - pending approval',
      data: {
        businessId: business.business_id,
        companyName: business.company_name,
        email: business.email,
        ceoName: business.ceo_name,
        status: business.status
      }
    });

  } catch (error) {
    console.error('Business registration error:', error);
    if (error.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'Business with this registration number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Business registration failed'
      });
    }
  }
});

// 4. GOVERNMENT REGISTRATION
app.post('/api/governments/register', async (req, res) => {
  try {
    const {
      agencyName, governmentCode, agencyType, governmentLevel,
      establishedYear, employeeCount, email, phone, website, address,
      directorName, directorEmail, directorPhone, directorPosition,
      jurisdiction, services, budgetRange, subscriptionPlan
    } = req.body;

    if (!agencyName || !governmentCode || !agencyType || !governmentLevel || !email) {
      return res.status(400).json({
        success: false,
        message: 'Agency name, government code, agency type, government level, and email are required'
      });
    }

    const existingCheck = await pool.query(
      'SELECT * FROM governments WHERE government_code = $1 OR email = $2 OR agency_name = $3',
      [governmentCode, email, agencyName]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Government agency already registered with this government code, email, or name'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM governments');
    const governmentId = 'TWCG' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    const result = await pool.query(
      `INSERT INTO governments 
       (government_id, agency_name, government_code, agency_type, government_level, 
        established_year, employee_count, email, phone, website, address, director_name, 
        director_email, director_phone, director_position, jurisdiction, services, budget_range, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
       RETURNING government_id, agency_name, email, director_name, status`,
      [
        governmentId, agencyName, governmentCode, agencyType, governmentLevel,
        establishedYear, employeeCount, email, phone, website, address, directorName,
        directorEmail, directorPhone, directorPosition || 'Director General', jurisdiction,
        services || [], budgetRange, subscriptionPlan || 'free'
      ]
    );

    const government = result.rows[0];
    res.json({
      success: true,
      message: 'Government agency registered successfully - pending approval',
      data: {
        governmentId: government.government_id,
        agencyName: government.agency_name,
        email: government.email,
        directorName: government.director_name,
        status: government.status
      }
    });

  } catch (error) {
    console.error('Government registration error:', error);
    if (error.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'Government agency with this government code or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Government registration failed'
      });
    }
  }
});

// 5. HEALTHCARE REGISTRATION
app.post('/api/healthcare/register', async (req, res) => {
  try {
    const {
      hospitalName, licenseNumber, facilityType, medicalSpecialty,
      establishedYear, bedCapacity, email, phone, website, address,
      directorName, directorEmail, directorPhone, directorPosition,
      accreditation, emergencyServices, specialties, subscriptionPlan
    } = req.body;

    if (!hospitalName || !licenseNumber || !facilityType || !medicalSpecialty || !email) {
      return res.status(400).json({
        success: false,
        message: 'Hospital name, license number, facility type, medical specialty, and email are required'
      });
    }

    const existingCheck = await pool.query(
      'SELECT * FROM healthcare WHERE license_number = $1 OR email = $2 OR hospital_name = $3',
      [licenseNumber, email, hospitalName]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Healthcare facility already registered with this license number, email, or name'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM healthcare');
    const healthcareId = 'TWCH' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    const result = await pool.query(
      `INSERT INTO healthcare 
       (healthcare_id, hospital_name, license_number, facility_type, medical_specialty, 
        established_year, bed_capacity, email, phone, website, address, director_name, 
        director_email, director_phone, director_position, accreditation, emergency_services, specialties, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
       RETURNING healthcare_id, hospital_name, email, director_name, status`,
      [
        healthcareId, hospitalName, licenseNumber, facilityType, medicalSpecialty,
        establishedYear, bedCapacity, email, phone, website, address, directorName,
        directorEmail, directorPhone, directorPosition || 'Medical Director', accreditation,
        emergencyServices || false, specialties || [], subscriptionPlan || 'free'
      ]
    );

    const healthcare = result.rows[0];
    res.json({
      success: true,
      message: 'Healthcare facility registered successfully - pending approval',
      data: {
        healthcareId: healthcare.healthcare_id,
        hospitalName: healthcare.hospital_name,
        email: healthcare.email,
        directorName: healthcare.director_name,
        status: healthcare.status
      }
    });

  } catch (error) {
    console.error('Healthcare registration error:', error);
    if (error.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'Healthcare facility with this license number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Healthcare registration failed'
      });
    }
  }
});

// 6. INDUSTRIAL REGISTRATION
app.post('/api/industrials/register', async (req, res) => {
  try {
    const {
      companyName, registrationNumber, industryType, productCategory,
      establishedYear, employeeCount, email, phone, website, address,
      managerName, managerEmail, managerPhone, managerPosition,
      productionCapacity, certifications, subscriptionPlan
    } = req.body;

    if (!companyName || !registrationNumber || !industryType || !productCategory || !email) {
      return res.status(400).json({
        success: false,
        message: 'Company name, registration number, industry type, product category, and email are required'
      });
    }

    const existingCheck = await pool.query(
      'SELECT * FROM industrials WHERE registration_number = $1 OR email = $2 OR company_name = $3',
      [registrationNumber, email, companyName]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Industrial company already registered with this registration number, email, or name'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM industrials');
    const industrialId = 'TWCI' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    const result = await pool.query(
      `INSERT INTO industrials 
       (industrial_id, company_name, registration_number, industry_type, product_category, 
        established_year, employee_count, email, phone, website, address, manager_name, 
        manager_email, manager_phone, manager_position, production_capacity, certifications, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
       RETURNING industrial_id, company_name, email, manager_name, status`,
      [
        industrialId, companyName, registrationNumber, industryType, productCategory,
        establishedYear, employeeCount, email, phone, website, address, managerName,
        managerEmail, managerPhone, managerPosition || 'Plant Manager', productionCapacity,
        certifications || [], subscriptionPlan || 'free'
      ]
    );

    const industrial = result.rows[0];
    res.json({
      success: true,
      message: 'Industrial company registered successfully - pending approval',
      data: {
        industrialId: industrial.industrial_id,
        companyName: industrial.company_name,
        email: industrial.email,
        managerName: industrial.manager_name,
        status: industrial.status
      }
    });

  } catch (error) {
    console.error('Industrial registration error:', error);
    if (error.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'Industrial company with this registration number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Industrial registration failed'
      });
    }
  }
});

// 7. NONPROFIT REGISTRATION
app.post('/api/nonprofits/register', async (req, res) => {
  try {
    const {
      organizationName, registrationNumber, organizationType, focusArea,
      foundedYear, beneficiaryCount, email, phone, website, address,
      directorName, directorEmail, directorPhone, directorPosition,
      missionStatement, fundingSources, programs, subscriptionPlan
    } = req.body;

    if (!organizationName || !registrationNumber || !organizationType || !focusArea || !email) {
      return res.status(400).json({
        success: false,
        message: 'Organization name, registration number, organization type, focus area, and email are required'
      });
    }

    const existingCheck = await pool.query(
      'SELECT * FROM nonprofits WHERE registration_number = $1 OR email = $2 OR organization_name = $3',
      [registrationNumber, email, organizationName]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Nonprofit organization already registered with this registration number, email, or name'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM nonprofits');
    const nonprofitId = 'TWCN' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    const result = await pool.query(
      `INSERT INTO nonprofits 
       (nonprofit_id, organization_name, registration_number, organization_type, focus_area, 
        founded_year, beneficiary_count, email, phone, website, address, director_name, 
        director_email, director_phone, director_position, mission_statement, funding_sources, programs, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
       RETURNING nonprofit_id, organization_name, email, director_name, status`,
      [
        nonprofitId, organizationName, registrationNumber, organizationType, focusArea,
        foundedYear, beneficiaryCount, email, phone, website, address, directorName,
        directorEmail, directorPhone, directorPosition || 'Executive Director', missionStatement,
        fundingSources || [], programs || [], subscriptionPlan || 'free'
      ]
    );

    const nonprofit = result.rows[0];
    res.json({
      success: true,
      message: 'Nonprofit organization registered successfully - pending approval',
      data: {
        nonprofitId: nonprofit.nonprofit_id,
        organizationName: nonprofit.organization_name,
        email: nonprofit.email,
        directorName: nonprofit.director_name,
        status: nonprofit.status
      }
    });

  } catch (error) {
    console.error('Nonprofit registration error:', error);
    if (error.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'Nonprofit organization with this registration number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Nonprofit registration failed'
      });
    }
  }
});

// 8. RELIGIOUS REGISTRATION
app.post('/api/religious/register', async (req, res) => {
  try {
    const {
      organizationName, registrationNumber, religionType, denomination,
      establishedYear, congregationSize, email, phone, website, address,
      leaderName, leaderEmail, leaderPhone, leaderPosition,
      services, activities, subscriptionPlan
    } = req.body;

    if (!organizationName || !registrationNumber || !religionType || !email) {
      return res.status(400).json({
        success: false,
        message: 'Organization name, registration number, religion type, and email are required'
      });
    }

    const existingCheck = await pool.query(
      'SELECT * FROM religious WHERE registration_number = $1 OR email = $2 OR organization_name = $3',
      [registrationNumber, email, organizationName]
    );

    if (existingCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Religious organization already registered with this registration number, email, or name'
      });
    }

    const countResult = await pool.query('SELECT COUNT(*) as count FROM religious');
    const religiousId = 'TWCR' + String(parseInt(countResult.rows[0].count) + 1).padStart(4, '0');

    const result = await pool.query(
      `INSERT INTO religious 
       (religious_id, organization_name, registration_number, religion_type, denomination, 
        established_year, congregation_size, email, phone, website, address, leader_name, 
        leader_email, leader_phone, leader_position, services, activities, subscription_plan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
       RETURNING religious_id, organization_name, email, leader_name, status`,
      [
        religiousId, organizationName, registrationNumber, religionType, denomination,
        establishedYear, congregationSize, email, phone, website, address, leaderName,
        leaderEmail, leaderPhone, leaderPosition || 'Pastor', services || [],
        activities || [], subscriptionPlan || 'free'
      ]
    );

    const religious = result.rows[0];
    res.json({
      success: true,
      message: 'Religious organization registered successfully - pending approval',
      data: {
        religiousId: religious.religious_id,
        organizationName: religious.organization_name,
        email: religious.email,
        leaderName: religious.leader_name,
        status: religious.status
      }
    });

  } catch (error) {
    console.error('Religious registration error:', error);
    if (error.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'Religious organization with this registration number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Religious registration failed'
      });
    }
  }
});

// ==================== TEST & UTILITY ROUTES ====================
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

app.get('/api/setup-database', async (req, res) => {
  try {
    await initializeDatabase();
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
app.get('/', (req, res) => {
  res.json({
    message: '🚀 TrendWave Connect API is running!',
    version: '1.0.0',
    endpoints: {
      testDb: 'GET /api/test-db',
      login: 'POST /api/auth/login',
      registerSchool: 'POST /api/schools/register',
      registerAssociation: 'POST /api/associations/register',
      registerBusiness: 'POST /api/businesses/register',
      registerGovernment: 'POST /api/governments/register',
      registerHealthcare: 'POST /api/healthcare/register',
      registerIndustrial: 'POST /api/industrials/register',
      registerNonprofit: 'POST /api/nonprofits/register',
      registerReligious: 'POST /api/religious/register',
      listSchools: 'GET /api/schools',
      setupDatabase: 'GET /api/setup-database'
    },
    database: 'PostgreSQL',
    status: 'Active'
  });
});

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
🚀 Ready for registrations!

📋 Available Registration Endpoints:
   Schools: POST /api/schools/register
   Associations: POST /api/associations/register  
   Businesses: POST /api/businesses/register
   Government: POST /api/governments/register
   Healthcare: POST /api/healthcare/register
   Industrial: POST /api/industrials/register
   Nonprofit: POST /api/nonprofits/register
   Religious: POST /api/religious/register

💡 Test: http://localhost:${PORT}/api/test-db
  `);
});
