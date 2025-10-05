import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function IndustrialRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Industrial Company Information
    companyName: '',
    registrationNumber: '',
    industryType: '',
    productCategory: '',
    establishedYear: '',
    employeeCount: '',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    
    // Location
    address: '',
    
    // Management
    managerName: '',
    managerEmail: '',
    managerPhone: '',
    managerPosition: 'Plant Manager',
    
    // Industrial Info
    productionCapacity: '',
    certifications: [],
    
    // Plan
    subscriptionPlan: 'free'
  });

  const industryTypes = [
    'Manufacturing',
    'Food Processing',
    'Textile & Apparel',
    'Chemical & Pharmaceutical',
    'Metals & Mining',
    'Automotive',
    'Electronics',
    'Construction Materials',
    'Packaging',
    'Plastics & Rubber',
    'Wood & Furniture',
    'Energy & Utilities'
  ];

  const productCategories = [
    'Consumer Goods',
    'Industrial Equipment',
    'Raw Materials',
    'Components & Parts',
    'Building Materials',
    'Food & Beverages',
    'Pharmaceuticals',
    'Textiles',
    'Electronics',
    'Chemicals',
    'Automotive Parts',
    'Packaging Materials'
  ];

  const industrialCertifications = [
    'ISO 9001 (Quality Management)',
    'ISO 14001 (Environmental)',
    'ISO 45001 (Health & Safety)',
    'Good Manufacturing Practice (GMP)',
    'HACCP (Food Safety)',
    'CE Marking',
    'UL Certification',
    'FDA Approval',
    'Organic Certification',
    'Fair Trade',
    'LEED Certification',
    'Industry Specific Standards'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCertificationToggle = (certification) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter(c => c !== certification)
        : [...prev.certifications, certification]
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    const industrialId = `TWCI${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    router.push(`/auth/success?id=${industrialId}&type=industrial`);
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#475569'}}>🏭</div>
        <div>
          <h3 style={styles.stepTitle}>Industrial Company Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your manufacturing or industrial business</p>
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
            placeholder="IND/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Industry Type *</label>
          <select
            value={formData.industryType}
            onChange={(e) => handleInputChange('industryType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select industry type</option>
            {industryTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Product Category *</label>
          <select
            value={formData.productCategory}
            onChange={(e) => handleInputChange('productCategory', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select product category</option>
            {productCategories.map(category => (
              <option key={category} value={category}>{category}</option>
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
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Add other steps...

  const steps = [
    { number: 1, title: 'Company Info', component: renderStep1 },
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
              <div style={{...styles.orgIcon, background: '#475569'}}>🏭</div>
              <div>
                <h1 style={styles.title}>Industrial Registration</h1>
                <p style={styles.subtitle}>Register your industrial company with TrendWave Connect</p>
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
                background: '#475569'
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
                  background: currentStep >= step.number ? '#475569' : '#E5E7EB',
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
                style={{...styles.primaryButton, background: '#475569'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#475569'}}
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
          border-color: #475569 !important;
          box-shadow: 0 0 0 3px rgba(71, 85, 105, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

// Use the same styles object structure
const styles = {
  // ... Same structure as previous forms with gray theme (#475569)
};
