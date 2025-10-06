import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AssociationRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Association Information
    associationName: '',
    registrationNumber: '',
    associationType: '',
    professionalField: '',
    establishedYear: '',
    memberCount: '',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    
    // Location
    address: '',
    
    // Leadership
    presidentName: '',
    presidentEmail: '',
    presidentPhone: '',
    presidentPosition: 'President',
    
    // Association Info
    membershipTypes: [],
    activities: [],
    
    // Plan
    subscriptionPlan: 'free'
  });

  const associationTypes = [
    'Professional Association',
    'Trade Union',
    'Alumni Association',
    'Sports Club',
    'Cultural Association',
    'Social Club',
    'Community Association',
    'Student Association',
    'Business Association',
    'Technical Association',
    'Scientific Society',
    'Artistic Association'
  ];

  const professionalFields = [
    'Medical & Healthcare',
    'Legal',
    'Engineering',
    'Education',
    'Information Technology',
    'Finance & Banking',
    'Agriculture',
    'Construction',
    'Hospitality',
    'Media & Communications',
    'Science & Research',
    'Arts & Entertainment'
  ];

  const membershipTypes = [
    'Individual Membership',
    'Corporate Membership',
    'Student Membership',
    'Associate Membership',
    'Life Membership',
    'Honorary Membership',
    'International Membership',
    'Retired Membership'
  ];

  const associationActivities = [
    'Professional Development',
    'Networking Events',
    'Conferences & Seminars',
    'Training Workshops',
    'Publications',
    'Advocacy & Lobbying',
    'Certification Programs',
    'Research & Development',
    'Community Service',
    'Mentorship Programs',
    'Awards & Recognition',
    'Industry Standards'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/associations/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        const associationId = result.data.associationId;
        router.push(`/auth/success?id=${associationId}&type=association`);
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#DB2777'}}>👥</div>
        <div>
          <h3 style={styles.stepTitle}>Association Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your professional association or club</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Association Name *</label>
          <input
            type="text"
            value={formData.associationName}
            onChange={(e) => handleInputChange('associationName', e.target.value)}
            placeholder="Enter official association name"
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
            placeholder="ASS/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Association Type *</label>
          <select
            value={formData.associationType}
            onChange={(e) => handleInputChange('associationType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select association type</option>
            {associationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Professional Field</label>
          <select
            value={formData.professionalField}
            onChange={(e) => handleInputChange('professionalField', e.target.value)}
            style={styles.select}
          >
            <option value="">Select field</option>
            {professionalFields.map(field => (
              <option key={field} value={field}>{field}</option>
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
          <label style={styles.label}>Number of Members</label>
          <select
            value={formData.memberCount}
            onChange={(e) => handleInputChange('memberCount', e.target.value)}
            style={styles.select}
          >
            <option value="">Select range</option>
            <option value="1-50">1-50 members</option>
            <option value="51-200">51-200 members</option>
            <option value="201-500">201-500 members</option>
            <option value="501-1000">501-1000 members</option>
            <option value="1000+">1000+ members</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#DB2777'}}>📞</div>
        <div>
          <h3 style={styles.stepTitle}>Contact Information</h3>
          <p style={styles.stepSubtitle}>How can we reach your association?</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="contact@association.org"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourassociation.org"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter association address"
            style={styles.textarea}
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#DB2777'}}>👨‍💼</div>
        <div>
          <h3 style={styles.stepTitle}>Leadership Information</h3>
          <p style={styles.stepSubtitle}>Primary contact person for the association</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>President/Chairperson Name</label>
          <input
            type="text"
            value={formData.presidentName}
            onChange={(e) => handleInputChange('presidentName', e.target.value)}
            placeholder="Full name of president"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>President Email</label>
          <input
            type="email"
            value={formData.presidentEmail}
            onChange={(e) => handleInputChange('presidentEmail', e.target.value)}
            placeholder="president@association.org"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>President Phone</label>
          <input
            type="tel"
            value={formData.presidentPhone}
            onChange={(e) => handleInputChange('presidentPhone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Position</label>
          <select
            value={formData.presidentPosition}
            onChange={(e) => handleInputChange('presidentPosition', e.target.value)}
            style={styles.select}
          >
            <option value="President">President</option>
            <option value="Chairperson">Chairperson</option>
            <option value="Director">Director</option>
            <option value="Coordinator">Coordinator</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#DB2777'}}>🎯</div>
        <div>
          <h3 style={styles.stepTitle}>Association Details</h3>
          <p style={styles.stepSubtitle}>Membership types and activities</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Membership Types Offered</label>
          <div style={styles.checkboxGrid}>
            {membershipTypes.map(type => (
              <label key={type} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.membershipTypes.includes(type)}
                  onChange={() => handleArrayToggle('membershipTypes', type)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Association Activities</label>
          <div style={styles.checkboxGrid}>
            {associationActivities.map(activity => (
              <label key={activity} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.activities.includes(activity)}
                  onChange={() => handleArrayToggle('activities', activity)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{activity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Association Info', component: renderStep1 },
    { number: 2, title: 'Contact', component: renderStep2 },
    { number: 3, title: 'Leadership', component: renderStep3 },
    { number: 4, title: 'Details', component: renderStep4 }
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
              <div style={{...styles.orgIcon, background: '#DB2777'}}>👥</div>
              <div>
                <h1 style={styles.title}>Association Registration</h1>
                <p style={styles.subtitle}>Register your professional association with TrendWave Connect</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                background: '#DB2777'
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
                  background: currentStep >= step.number ? '#DB2777' : '#E5E7EB',
                  color: currentStep >= step.number ? 'white' : '#9CA3AF'
                }}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span style={styles.stepTitle}>{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {steps[currentStep - 1].component()}

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
                style={{...styles.primaryButton, background: '#DB2777'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#DB2777'}}
                disabled={loading}
              >
                {loading ? 'Registering Association...' : 'Complete Registration'}
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
          border-color: #DB2777 !important;
          box-shadow: 0 0 0 3px rgba(219, 39, 119, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

// COMPLETE STYLES OBJECT
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
    color: '#DB2777'
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
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '10px'
  },
  checkboxLabel: {
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
  checkboxText: {
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
