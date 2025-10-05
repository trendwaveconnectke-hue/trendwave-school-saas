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
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    const associationId = `TWCA${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    router.push(`/auth/success?id=${associationId}&type=association`);
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

  // Add other steps...

  const steps = [
    { number: 1, title: 'Association Info', component: renderStep1 },
    // Add other steps here
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

// Use the same styles object structure
const styles = {
  // ... Same structure as previous forms with pink theme (#DB2777)
};
