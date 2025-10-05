import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function BusinessRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    registrationNumber: '',
    companyType: '',
    industrySector: '',
    foundedYear: '',
    employeeCount: '',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    
    // Location
    address: '',
    
    // Leadership
    ceoName: '',
    ceoEmail: '',
    ceoPhone: '',
    ceoPosition: 'CEO',
    
    // Business Info
    businessModel: '',
    annualRevenue: '',
    services: [],
    
    // Plan
    subscriptionPlan: 'free'
  });

  const companyTypes = [
    'Startup',
    'Small Business',
    'Medium Enterprise',
    'Large Corporation',
    'Multinational',
    'Family Business',
    'Partnership',
    'Sole Proprietorship',
    'Public Company',
    'Private Limited'
  ];

  const industrySectors = [
    'Technology',
    'Finance & Banking',
    'Healthcare',
    'Retail & E-commerce',
    'Manufacturing',
    'Real Estate',
    'Education',
    'Hospitality & Tourism',
    'Agriculture',
    'Construction',
    'Transportation',
    'Energy',
    'Media & Entertainment',
    'Professional Services'
  ];

  const businessModels = [
    'B2B (Business to Business)',
    'B2C (Business to Consumer)',
    'B2G (Business to Government)',
    'C2C (Consumer to Consumer)',
    'SaaS (Software as a Service)',
    'E-commerce',
    'Marketplace',
    'Subscription',
    'Freemium',
    'Manufacturing',
    'Retail',
    'Consulting'
  ];

  const businessServices = [
    'Product Sales',
    'Service Provision',
    'Consulting',
    'Software Development',
    'Digital Marketing',
    'Financial Services',
    'Healthcare Services',
    'Education Services',
    'Retail Operations',
    'Manufacturing',
    'Logistics',
    'Customer Support'
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
    const companyId = `TWCI${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    router.push(`/auth/success?id=${companyId}&type=business`);
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#059669'}}>🏢</div>
        <div>
          <h3 style={styles.stepTitle}>Company Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your business</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Company Name *</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Enter official company name"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Business Registration Number *</label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            placeholder="CR/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Company Type *</label>
          <select
            value={formData.companyType}
            onChange={(e) => handleInputChange('companyType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select company type</option>
            {companyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Industry Sector *</label>
          <select
            value={formData.industrySector}
            onChange={(e) => handleInputChange('industrySector', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select industry</option>
            {industrySectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Year Founded</label>
          <input
            type="number"
            value={formData.foundedYear}
            onChange={(e) => handleInputChange('foundedYear', e.target.value)}
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
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#059669'}}>📞</div>
        <div>
          <h3 style={styles.stepTitle}>Business Contact</h3>
          <p style={styles.stepSubtitle}>How can we reach your company?</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Business Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="contact@company.com"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Business Phone *</label>
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
          <label style={styles.label}>Company Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourcompany.com"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Business Address *</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter complete business address"
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
        <div style={{...styles.stepIcon, background: '#059669'}}>👨‍💼</div>
        <div>
          <h3 style={styles.stepTitle}>Leadership & Management</h3>
          <p style={styles.stepSubtitle}>Primary contact for the company</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>CEO/Managing Director Name *</label>
          <input
            type="text"
            value={formData.ceoName}
            onChange={(e) => handleInputChange('ceoName', e.target.value)}
            placeholder="Full name of CEO/Director"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>CEO Email *</label>
          <input
            type="email"
            value={formData.ceoEmail}
            onChange={(e) => handleInputChange('ceoEmail', e.target.value)}
            placeholder="ceo@company.com"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>CEO Phone *</label>
          <input
            type="tel"
            value={formData.ceoPhone}
            onChange={(e) => handleInputChange('ceoPhone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Position *</label>
          <select
            value={formData.ceoPosition}
            onChange={(e) => handleInputChange('ceoPosition', e.target.value)}
            style={styles.select}
            required
          >
            <option value="CEO">Chief Executive Officer</option>
            <option value="Managing Director">Managing Director</option>
            <option value="President">President</option>
            <option value="General Manager">General Manager</option>
            <option value="Owner">Business Owner</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#059669'}}>💼</div>
        <div>
          <h3 style={styles.stepTitle}>Business Operations</h3>
          <p style={styles.stepSubtitle}>Company model and services</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Business Model *</label>
          <select
            value={formData.businessModel}
            onChange={(e) => handleInputChange('businessModel', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select business model</option>
            {businessModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Annual Revenue Range</label>
          <select
            value={formData.annualRevenue}
            onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
            style={styles.select}
          >
            <option value="">Select revenue range</option>
            <option value="Under $100K">Under $100,000</option>
            <option value="$100K-$500K">$100,000 - $500,000</option>
            <option value="$500K-$1M">$500,000 - $1 Million</option>
            <option value="$1M-$5M">$1 Million - $5 Million</option>
            <option value="$5M-$10M">$5 Million - $10 Million</option>
            <option value="$10M+">Over $10 Million</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Core Business Services</label>
          <div style={styles.servicesGrid}>
            {businessServices.map(service => (
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
    { number: 1, title: 'Company Info', component: renderStep1 },
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
              <div style={{...styles.orgIcon, background: '#059669'}}>🏢</div>
              <div>
                <h1 style={styles.title}>Business Registration</h1>
                <p style={styles.subtitle}>Register your company with TrendWave Connect</p>
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
                background: '#059669'
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
                  background: currentStep >= step.number ? '#059669' : '#E5E7EB',
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
                style={{...styles.primaryButton, background: '#059669'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#059669'}}
                disabled={loading}
              >
                {loading ? 'Registering Company...' : 'Complete Registration'}
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
          border-color: #059669 !important;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

// Styles object (same structure as education form, with different colors)
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
    color: '#059669'
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
