import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function HealthcareRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Hospital Information
    hospitalName: '',
    licenseNumber: '',
    facilityType: '',
    medicalSpecialty: '',
    establishedYear: '',
    bedCapacity: '',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    
    // Location
    address: '',
    
    // Medical Director
    directorName: '',
    directorEmail: '',
    directorPhone: '',
    directorPosition: 'Medical Director',
    
    // Medical Info
    accreditation: '',
    emergencyServices: false,
    specialties: [],
    
    // Plan
    subscriptionPlan: 'free'
  });

  const facilityTypes = [
    'General Hospital',
    'Specialty Hospital',
    'Medical Clinic',
    'Dental Clinic',
    'Pharmacy',
    'Diagnostic Laboratory',
    'Rehabilitation Center',
    'Mental Health Facility',
    'Maternity Hospital',
    'Children Hospital',
    'Surgical Center',
    'Urgent Care Center'
  ];

  const medicalSpecialties = [
    'General Medicine',
    'Surgery',
    'Pediatrics',
    'Cardiology',
    'Dentistry',
    'Orthopedics',
    'Gynecology',
    'Neurology',
    'Oncology',
    'Psychiatry',
    'Dermatology',
    'Ophthalmology',
    'Emergency Medicine',
    'Radiology'
  ];

  const accreditations = [
    'Ministry of Health',
    'Joint Commission International',
    'ISO Certification',
    'National Accreditation Board',
    'College of Surgeons',
    'Medical Board',
    'Health Authority'
  ];

  const medicalServices = [
    'Emergency Care',
    'Surgery',
    'Maternity Services',
    'Pediatric Care',
    'Intensive Care',
    'Radiology',
    'Laboratory Services',
    'Pharmacy',
    'Physical Therapy',
    'Mental Health Services',
    'Dental Services',
    'Vaccination',
    'Health Checkups',
    'Specialist Consultations'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyToggle = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    const hospitalId = `TWCH${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    router.push(`/auth/success?id=${hospitalId}&type=healthcare`);
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#DC2626'}}>🏥</div>
        <div>
          <h3 style={styles.stepTitle}>Healthcare Facility Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your medical institution</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Hospital/Clinic Name *</label>
          <input
            type="text"
            value={formData.hospitalName}
            onChange={(e) => handleInputChange('hospitalName', e.target.value)}
            placeholder="Enter official facility name"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Medical License Number *</label>
          <input
            type="text"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
            placeholder="ML/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Facility Type *</label>
          <select
            value={formData.facilityType}
            onChange={(e) => handleInputChange('facilityType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select facility type</option>
            {facilityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Primary Medical Specialty *</label>
          <select
            value={formData.medicalSpecialty}
            onChange={(e) => handleInputChange('medicalSpecialty', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select specialty</option>
            {medicalSpecialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
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
          <label style={styles.label}>Bed Capacity</label>
          <input
            type="number"
            value={formData.bedCapacity}
            onChange={(e) => handleInputChange('bedCapacity', e.target.value)}
            placeholder="100"
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={formData.emergencyServices}
            onChange={(e) => handleInputChange('emergencyServices', e.target.checked)}
            style={styles.checkbox}
          />
          <span style={styles.checkboxText}>24/7 Emergency Services Available</span>
        </label>
      </div>
    </div>
  );

  // ... Similar structure for other steps (Contact, Director, Medical Services)

  const steps = [
    { number: 1, title: 'Facility Info', component: renderStep1 },
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
              <div style={{...styles.orgIcon, background: '#DC2626'}}>🏥</div>
              <div>
                <h1 style={styles.title}>Healthcare Registration</h1>
                <p style={styles.subtitle}>Register your medical facility with TrendWave Connect</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar with red color */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                background: '#DC2626'
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
                  background: currentStep >= step.number ? '#DC2626' : '#E5E7EB',
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
                style={{...styles.primaryButton, background: '#DC2626'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#DC2626'}}
                disabled={loading}
              >
                {loading ? 'Registering Facility...' : 'Complete Registration'}
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
          border-color: #DC2626 !important;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

// Styles object with healthcare theme
const styles = {
  // ... Same structure as previous forms, with healthcare colors
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '15px',
    background: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '8px',
    marginTop: '10px'
  },
  checkboxText: {
    fontSize: '14px',
    color: '#DC2626',
    fontWeight: '600'
  }
  // ... rest of styles
};
