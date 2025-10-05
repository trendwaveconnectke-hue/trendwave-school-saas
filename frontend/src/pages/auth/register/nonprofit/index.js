import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function NonprofitRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Organization Information
    organizationName: '',
    registrationNumber: '',
    organizationType: '',
    focusArea: '',
    foundedYear: '',
    beneficiaryCount: '',
    
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
    directorPosition: 'Executive Director',
    
    // NGO Info
    missionStatement: '',
    fundingSources: [],
    programs: [],
    
    // Plan
    subscriptionPlan: 'free'
  });

  const organizationTypes = [
    'Non-Governmental Organization (NGO)',
    'Charity',
    'Foundation',
    'Community-Based Organization',
    'Faith-Based Organization',
    'Humanitarian Organization',
    'Environmental Organization',
    'Human Rights Organization',
    'Development Organization',
    'Relief Organization',
    'Advocacy Group',
    'Professional Association'
  ];

  const focusAreas = [
    'Education',
    'Healthcare',
    'Poverty Alleviation',
    'Environmental Conservation',
    'Human Rights',
    'Women Empowerment',
    'Child Welfare',
    'Disaster Relief',
    'Community Development',
    'Animal Welfare',
    'Arts & Culture',
    'Youth Development',
    'Elderly Care',
    'Disability Support'
  ];

  const fundingSources = [
    'Government Grants',
    'Private Donations',
    'Corporate Sponsorship',
    'International Aid',
    'Membership Fees',
    'Fundraising Events',
    'Social Enterprise',
    'Foundation Grants',
    'Crowdfunding',
    'Religious Organizations'
  ];

  const programTypes = [
    'Education Programs',
    'Healthcare Services',
    'Skill Training',
    'Microfinance',
    'Advocacy & Awareness',
    'Emergency Relief',
    'Community Development',
    'Environmental Projects',
    'Research & Policy',
    'Capacity Building',
    'Legal Aid',
    'Counseling Services'
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
    const nonprofitId = `TWCN${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    router.push(`/auth/success?id=${nonprofitId}&type=nonprofit`);
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#EA580C'}}>🤝</div>
        <div>
          <h3 style={styles.stepTitle}>Nonprofit Organization Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your charitable organization</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Organization Name *</label>
          <input
            type="text"
            value={formData.organizationName}
            onChange={(e) => handleInputChange('organizationName', e.target.value)}
            placeholder="Enter official organization name"
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
            placeholder="NGO/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Organization Type *</label>
          <select
            value={formData.organizationType}
            onChange={(e) => handleInputChange('organizationType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select organization type</option>
            {organizationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Primary Focus Area *</label>
          <select
            value={formData.focusArea}
            onChange={(e) => handleInputChange('focusArea', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select focus area</option>
            {focusAreas.map(area => (
              <option key={area} value={area}>{area}</option>
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
          <label style={styles.label}>Beneficiaries Served (Annual)</label>
          <select
            value={formData.beneficiaryCount}
            onChange={(e) => handleInputChange('beneficiaryCount', e.target.value)}
            style={styles.select}
          >
            <option value="">Select range</option>
            <option value="1-100">1-100 beneficiaries</option>
            <option value="101-500">101-500 beneficiaries</option>
            <option value="501-1000">501-1000 beneficiaries</option>
            <option value="1001-5000">1001-5000 beneficiaries</option>
            <option value="5000+">5000+ beneficiaries</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#EA580C'}}>📞</div>
        <div>
          <h3 style={styles.stepTitle}>Organization Contact</h3>
          <p style={styles.stepSubtitle}>How can we reach your organization?</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="info@organization.org"
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
            placeholder="https://yourorganization.org"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Organization Address *</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter complete organization address"
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
        <div style={{...styles.stepIcon, background: '#EA580C'}}>👨‍💼</div>
        <div>
          <h3 style={styles.stepTitle}>Executive Leadership</h3>
          <p style={styles.stepSubtitle}>Primary contact for the organization</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Director's Name *</label>
          <input
            type="text"
            value={formData.directorName}
            onChange={(e) => handleInputChange('directorName', e.target.value)}
            placeholder="Full name of executive director"
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
            placeholder="director@organization.org"
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
            <option value="Executive Director">Executive Director</option>
            <option value="Program Director">Program Director</option>
            <option value="Country Director">Country Director</option>
            <option value="Founder">Founder</option>
            <option value="President">President</option>
            <option value="CEO">Chief Executive Officer</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#EA580C'}}>🎯</div>
        <div>
          <h3 style={styles.stepTitle}>Programs & Funding</h3>
          <p style={styles.stepSubtitle}>Organization mission and operations</p>
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mission Statement *</label>
          <textarea
            value={formData.missionStatement}
            onChange={(e) => handleInputChange('missionStatement', e.target.value)}
            placeholder="Brief description of your organization's mission and purpose"
            style={styles.textarea}
            rows="4"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Primary Funding Sources</label>
          <div style={styles.servicesGrid}>
            {fundingSources.map(source => (
              <label key={source} style={styles.serviceLabel}>
                <input
                  type="checkbox"
                  checked={formData.fundingSources.includes(source)}
                  onChange={() => handleArrayToggle('fundingSources', source)}
                  style={styles.checkbox}
                />
                <span style={styles.serviceText}>{source}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Program Areas</label>
          <div style={styles.servicesGrid}>
            {programTypes.map(program => (
              <label key={program} style={styles.serviceLabel}>
                <input
                  type="checkbox"
                  checked={formData.programs.includes(program)}
                  onChange={() => handleArrayToggle('programs', program)}
                  style={styles.checkbox}
                />
                <span style={styles.serviceText}>{program}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Org Info', component: renderStep1 },
    { number: 2, title: 'Contact', component: renderStep2 },
    { number: 3, title: 'Leadership', component: renderStep3 },
    { number: 4, title: 'Programs', component: renderStep4 }
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
              <div style={{...styles.orgIcon, background: '#EA580C'}}>🤝</div>
              <div>
                <h1 style={styles.title}>Nonprofit Registration</h1>
                <p style={styles.subtitle}>Register your nonprofit organization with TrendWave Connect</p>
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
                background: '#EA580C'
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
                  background: currentStep >= step.number ? '#EA580C' : '#E5E7EB',
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
                style={{...styles.primaryButton, background: '#EA580C'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#EA580C'}}
                disabled={loading}
              >
                {loading ? 'Registering Organization...' : 'Complete Registration'}
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
          border-color: #EA580C !important;
          box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

// Styles object (same structure with orange theme)
const styles = {
  // ... Same structure as previous forms with orange colors
  // Use the same styles object structure from government form
  // but update colors to #EA580C for nonprofit theme
};
