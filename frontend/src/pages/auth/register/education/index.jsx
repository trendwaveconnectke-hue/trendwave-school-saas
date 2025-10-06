import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function EducationRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // School Information
    schoolName: '',
    registrationNumber: '',
    schoolType: '',
    educationLevel: '',
    establishedYear: '',
    studentCapacity: '',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    
    // Location
    continent: '',
    country: '',
    county: '',
    address: '',
    
    // Administrator
    principalName: '',
    principalEmail: '',
    principalPhone: '',
    principalPosition: 'Principal',
    
    // Academic Info
    curriculum: '',
    accreditation: '',
    facilities: [],
    
    // Plan
    subscriptionPlan: 'free'
  });

  const schoolTypes = [
    'Public School',
    'Private School', 
    'International School',
    'Boarding School',
    'Day School',
    'Special Needs School',
    'Charter School'
  ];

  const educationLevels = [
    'Pre-Primary',
    'Primary',
    'Secondary', 
    'High School',
    'College',
    'University',
    'Vocational',
    'Mixed Levels'
  ];

  const curricula = [
    'National Curriculum',
    'British Curriculum',
    'American Curriculum',
    'IB Programme',
    'Cambridge Curriculum',
    'Montessori',
    'Waldorf',
    'Custom Curriculum'
  ];

  const facilities = [
    'Library',
    'Science Lab',
    'Computer Lab',
    'Sports Ground',
    'Swimming Pool',
    'Auditorium',
    'Cafeteria',
    'Dormitories',
    'Playground',
    'Art Room'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFacilityToggle = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate school ID
    const schoolId = `TWCS${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    // Redirect to success page
    router.push(`/auth/success?id=${schoolId}&type=education`);
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#4F46E5'}}>🎓</div>
        <div>
          <h3 style={styles.stepTitle}>School Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your educational institution</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>School Name *</label>
          <input
            type="text"
            value={formData.schoolName}
            onChange={(e) => handleInputChange('schoolName', e.target.value)}
            placeholder="Enter official school name"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Registration Number *</label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            placeholder="MOE/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>School Type *</label>
          <select
            value={formData.schoolType}
            onChange={(e) => handleInputChange('schoolType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select school type</option>
            {schoolTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Education Level *</label>
          <select
            value={formData.educationLevel}
            onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select education level</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Year Established</label>
          <input
            type="number"
            value={formData.establishedYear}
            onChange={(e) => handleInputChange('establishedYear', e.target.value)}
            placeholder="2020"
            min="1900"
            max="2024"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Student Capacity</label>
          <input
            type="number"
            value={formData.studentCapacity}
            onChange={(e) => handleInputChange('studentCapacity', e.target.value)}
            placeholder="500"
            style={styles.input}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#4F46E5'}}>📞</div>
        <div>
          <h3 style={styles.stepTitle}>Contact & Location</h3>
          <p style={styles.stepSubtitle}>Where can we reach your school?</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="admin@school.edu"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourschool.edu"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Physical Address *</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter complete school address"
            style={styles.textarea}
            rows="3"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#4F46E5'}}>👨‍🏫</div>
        <div>
          <h3 style={styles.stepTitle}>Principal & Administration</h3>
          <p style={styles.stepSubtitle}>Primary contact person for the school</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Principal's Name *</label>
          <input
            type="text"
            value={formData.principalName}
            onChange={(e) => handleInputChange('principalName', e.target.value)}
            placeholder="Full name of principal"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Principal's Email *</label>
          <input
            type="email"
            value={formData.principalEmail}
            onChange={(e) => handleInputChange('principalEmail', e.target.value)}
            placeholder="principal@school.edu"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Principal's Phone *</label>
          <input
            type="tel"
            value={formData.principalPhone}
            onChange={(e) => handleInputChange('principalPhone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Position *</label>
          <select
            value={formData.principalPosition}
            onChange={(e) => handleInputChange('principalPosition', e.target.value)}
            style={styles.select}
            required
          >
            <option value="Principal">Principal</option>
            <option value="Head Teacher">Head Teacher</option>
            <option value="Director">Director</option>
            <option value="Dean">Dean</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#4F46E5'}}>📚</div>
        <div>
          <h3 style={styles.stepTitle}>Academic Information</h3>
          <p style={styles.stepSubtitle}>Educational programs and facilities</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Curriculum *</label>
          <select
            value={formData.curriculum}
            onChange={(e) => handleInputChange('curriculum', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select curriculum</option>
            {curricula.map(curriculum => (
              <option key={curriculum} value={curriculum}>{curriculum}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Accreditation Body</label>
          <input
            type="text"
            value={formData.accreditation}
            onChange={(e) => handleInputChange('accreditation', e.target.value)}
            placeholder="Ministry of Education, etc."
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>School Facilities</label>
          <div style={styles.facilitiesGrid}>
            {facilities.map(facility => (
              <label key={facility} style={styles.facilityLabel}>
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(facility)}
                  onChange={() => handleFacilityToggle(facility)}
                  style={styles.checkbox}
                />
                <span style={styles.facilityText}>{facility}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'School Info', component: renderStep1 },
    { number: 2, title: 'Contact', component: renderStep2 },
    { number: 3, title: 'Principal', component: renderStep3 },
    { number: 4, title: 'Academic', component: renderStep4 }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <button
            onClick={() => router.push('/auth/option')}
            style={styles.backButton}
          >
            ← Choose Different Type
          </button>
          <div style={styles.headerContent}>
            <div style={styles.titleSection}>
              <div style={{...styles.orgIcon, background: '#4F46E5'}}>🎓</div>
              <div>
                <h1 style={styles.title}>School Registration</h1>
                <p style={styles.subtitle}>Register your educational institution with TrendWave Connect</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                background: '#4F46E5'
              }}
            />
          </div>
          <div style={styles.steps}>
            {steps.map((step, index) => (
              <div
                key={step.number}
                style={{
                  ...styles.step,
                  ...(currentStep >= step.number ? styles.activeStep : {}),
                  ...(currentStep > step.number ? styles.completedStep : {})
                }}
              >
                <div style={{
                  ...styles.stepNumber,
                  background: currentStep >= step.number ? '#4F46E5' : '#E5E7EB',
                  color: currentStep >= step.number ? 'white' : '#9CA3AF'
                }}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span style={styles.stepTitle}>{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {steps[currentStep - 1].component()}

          {/* Navigation Buttons */}
          <div style={styles.navigation}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                style={styles.secondaryButton}
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                style={{...styles.primaryButton, background: '#4F46E5'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#4F46E5'}}
                disabled={loading}
              >
                {loading ? 'Registering School...' : 'Complete Registration'}
              </button>
            )}
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #4F46E5 !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '800px',
    overflow: 'hidden'
  },
  header: {
    padding: '30px 40px 20px',
    borderBottom: '1px solid #E5E7EB'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px 0',
    marginBottom: '15px'
  },
  headerContent: {
    // Content styles
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  orgIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#1E3A8A',
    margin: '0 0 5px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0
  },
  progressContainer: {
    padding: '20px 40px',
    background: '#F8FAFC'
  },
  progressBar: {
    height: '6px',
    background: '#E5E7EB',
    borderRadius: '3px',
    marginBottom: '20px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  steps: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    color: '#9CA3AF',
    fontSize: '12px'
  },
  activeStep: {
    color: '#4F46E5'
  },
  completedStep: {
    color: '#10B981'
  },
  stepNumber: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  form: {
    padding: '40px'
  },
  stepContainer: {
    animation: 'fadeIn 0.5s ease-out'
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px'
  },
  stepIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'white'
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 5px 0'
  },
  stepSubtitle: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '14px',
    background: 'white',
    cursor: 'pointer'
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit',
    gridColumn: '1 / -1'
  },
  facilitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '10px',
    marginTop: '10px'
  },
  facilityLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    background: '#F8FAFC',
    borderRadius: '6px',
    border: '1px solid #E5E7EB',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  checkbox: {
    margin: 0
  },
  facilityText: {
    fontSize: '13px',
    color: '#374151'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #E5E7EB'
  },
  primaryButton: {
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  secondaryButton: {
    background: 'white',
    color: '#6B7280',
    border: '1px solid #D1D5DB',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  submitButton: {
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};
