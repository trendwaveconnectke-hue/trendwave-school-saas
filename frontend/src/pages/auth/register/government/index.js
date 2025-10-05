import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function GovernmentRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Agency Information
    agencyName: '',
    governmentCode: '',
    agencyType: '',
    governmentLevel: '',
    establishedYear: '',
    employeeCount: '',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    
    // Location
    address: '',
    
    // Director
    directorName: '',
    directorEmail: '',
    directorPhone: '',
    directorPosition: 'Director General',
    
    // Agency Info
    jurisdiction: '',
    services: [],
    budgetRange: '',
    
    // Plan
    subscriptionPlan: 'free'
  });

  const agencyTypes = [
    'Ministry',
    'Department',
    'Agency',
    'Commission',
    'Authority',
    'Bureau',
    'Office',
    'Directorate',
    'Service',
    'Corporation',
    'Institute',
    'Council'
  ];

  const governmentLevels = [
    'National/Federal',
    'State/Provincial',
    'County/District',
    'Municipal/Local',
    'Regional',
    'International'
  ];

  const jurisdictions = [
    'Education',
    'Health',
    'Finance',
    'Defense',
    'Infrastructure',
    'Agriculture',
    'Commerce',
    'Justice',
    'Environment',
    'Transportation',
    'Energy',
    'Tourism',
    'Labor',
    'Social Services'
  ];

  const governmentServices = [
    'Policy Making',
    'Regulation',
    'Service Delivery',
    'Licensing',
    'Inspection',
    'Enforcement',
    'Research',
    'Planning',
    'Funding',
    'Monitoring',
    'Advisory Services',
    'Public Awareness',
    'International Relations',
    'Emergency Response'
  ];

  const budgetRanges = [
    'Under $1M',
    '$1M - $10M',
    '$10M - $50M',
    '$50M - $100M',
    '$100M - $500M',
    '$500M - $1B',
    'Over $1B'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    const agencyId = `TWCG${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    router.push(`/auth/success?id=${agencyId}&type=government`);
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#7C3AED'}}>🏛️</div>
        <div>
          <h3 style={styles.stepTitle}>Government Agency Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your government institution</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Agency Name *</label>
          <input
            type="text"
            value={formData.agencyName}
            onChange={(e) => handleInputChange('agencyName', e.target.value)}
            placeholder="Enter official agency name"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Government Code *</label>
          <input
            type="text"
            value={formData.governmentCode}
            onChange={(e) => handleInputChange('governmentCode', e.target.value)}
            placeholder="GOV/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Agency Type *</label>
          <select
            value={formData.agencyType}
            onChange={(e) => handleInputChange('agencyType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select agency type</option>
            {agencyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Government Level *</label>
          <select
            value={formData.governmentLevel}
            onChange={(e) => handleInputChange('governmentLevel', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select government level</option>
            {governmentLevels.map(level => (
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
          <label style={styles.label}>Number of Employees</label>
          <select
            value={formData.employeeCount}
            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
            style={styles.select}
          >
            <option value="">Select range</option>
            <option value="1-50">1-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1001-5000">1001-5000 employees</option>
            <option value="5000+">5000+ employees</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#7C3AED'}}>📞</div>
        <div>
          <h3 style={styles.stepTitle}>Agency Contact</h3>
          <p style={styles.stepSubtitle}>Official contact information</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Official Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="info@agency.gov"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Official Phone *</label>
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
          <label style={styles.label}>Government Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://agency.gov"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Headquarters Address *</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter complete agency address"
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
        <div style={{...styles.stepIcon, background: '#7C3AED'}}>👨‍💼</div>
        <div>
          <h3 style={styles.stepTitle}>Agency Leadership</h3>
          <p style={styles.stepSubtitle}>Director or head of agency</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Director's Name *</label>
          <input
            type="text"
            value={formData.directorName}
            onChange={(e) => handleInputChange('directorName', e.target.value)}
            placeholder="Full name of director"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Director's Email *</label>
          <input
            type="email"
            value={formData.directorEmail}
            onChange={(e) => handleInputChange('directorEmail', e.target.value)}
            placeholder="director@agency.gov"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Director's Phone *</label>
          <input
            type="tel"
            value={formData.directorPhone}
            onChange={(e) => handleInputChange('directorPhone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Position *</label>
          <select
            value={formData.directorPosition}
            onChange={(e) => handleInputChange('directorPosition', e.target.value)}
            style={styles.select}
            required
          >
            <option value="Director General">Director General</option>
            <option value="Commissioner">Commissioner</option>
            <option value="Secretary">Secretary</option>
            <option value="Director">Director</option>
            <option value="Administrator">Administrator</option>
            <option value="Chief Officer">Chief Officer</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#7C3AED'}}>📊</div>
        <div>
          <h3 style={styles.stepTitle}>Agency Operations</h3>
          <p style={styles.stepSubtitle}>Jurisdiction and services</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Primary Jurisdiction *</label>
          <select
            value={formData.jurisdiction}
            onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select jurisdiction</option>
            {jurisdictions.map(jurisdiction => (
              <option key={jurisdiction} value={jurisdiction}>{jurisdiction}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Annual Budget Range</label>
          <select
            value={formData.budgetRange}
            onChange={(e) => handleInputChange('budgetRange', e.target.value)}
            style={styles.select}
          >
            <option value="">Select budget range</option>
            {budgetRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Core Government Services</label>
          <div style={styles.servicesGrid}>
            {governmentServices.map(service => (
              <label key={service} style={styles.serviceLabel}>
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  style={styles.checkbox}
                />
                <span style={styles.serviceText}>{service}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Agency Info', component: renderStep1 },
    { number: 2, title: 'Contact', component: renderStep2 },
    { number: 3, title: 'Leadership', component: renderStep3 },
    { number: 4, title: 'Operations', component: renderStep4 }
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
              <div style={{...styles.orgIcon, background: '#7C3AED'}}>🏛️</div>
              <div>
                <h1 style={styles.title}>Government Registration</h1>
                <p style={styles.subtitle}>Register your government agency with TrendWave Connect</p>
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
                background: '#7C3AED'
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
                  background: currentStep >= step.number ? '#7C3AED' : '#E5E7EB',
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
                style={{...styles.primaryButton, background: '#7C3AED'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#7C3AED'}}
                disabled={loading}
              >
                {loading ? 'Registering Agency...' : 'Complete Registration'}
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
          border-color: #7C3AED !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

// Styles object (same structure as previous forms)
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
    color: '#7C3AED'
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
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '10px'
  },
  serviceLabel: {
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
  serviceText: {
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
