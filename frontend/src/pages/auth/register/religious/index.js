import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function ReligiousRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Religious Organization Information
    organizationName: '',
    registrationNumber: '',
    religionType: '',
    denomination: '',
    establishedYear: '',
    congregationSize: '',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    
    // Location
    address: '',
    
    // Leadership
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderPosition: 'Pastor',
    
    // Religious Info
    services: [],
    activities: [],
    
    // Plan
    subscriptionPlan: 'free'
  });

  const religionTypes = [
    'Christianity',
    'Islam',
    'Hinduism',
    'Buddhism',
    'Judaism',
    'Sikhism',
    'Traditional African',
    'Baháʼí',
    'Jainism',
    'Shinto',
    'Taoism',
    'Other'
  ];

  const christianDenominations = [
    'Catholic',
    'Protestant',
    'Anglican',
    'Pentecostal',
    'Orthodox',
    'Evangelical',
    'Methodist',
    'Baptist',
    'Lutheran',
    'Presbyterian',
    'Seventh-day Adventist',
    'Non-denominational'
  ];

  const islamDenominations = [
    'Sunni',
    'Shia',
    'Sufi',
    'Ahmadiyya',
    'Quranist'
  ];

  const leaderPositions = [
    'Pastor',
    'Priest',
    'Imam',
    'Rabbi',
    'Reverend',
    'Bishop',
    'Elder',
    'Minister',
    'Preacher',
    'Spiritual Leader'
  ];

  const religiousServices = [
    'Weekly Worship',
    'Friday Prayers (Jumuah)',
    'Sunday Service',
    'Bible Study',
    'Quran Study',
    'Prayer Meetings',
    'Youth Services',
    'Children Ministry',
    'Women Fellowship',
    'Men Fellowship',
    'Choir/Music Ministry',
    'Counselling Services'
  ];

  const communityActivities = [
    'Charity Work',
    'Community Outreach',
    'Education Programs',
    'Healthcare Services',
    'Disaster Relief',
    'Marriage Counselling',
    'Youth Development',
    'Elderly Care',
    'Food Distribution',
    'Shelter Services',
    'Prison Ministry',
    'Hospital Visitation'
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
    const religiousId = `TWCC${Math.floor(1000 + Math.random() * 9000)}`;
    
    setLoading(false);
    router.push(`/auth/success?id=${religiousId}&type=religious`);
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <div style={{...styles.stepIcon, background: '#0EA5E9'}}>⛪</div>
        <div>
          <h3 style={styles.stepTitle}>Religious Organization Information</h3>
          <p style={styles.stepSubtitle}>Tell us about your religious institution</p>
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
            placeholder="REL/1234/2024"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Religion *</label>
          <select
            value={formData.religionType}
            onChange={(e) => handleInputChange('religionType', e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select religion</option>
            {religionTypes.map(religion => (
              <option key={religion} value={religion}>{religion}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Denomination/Stream</label>
          <select
            value={formData.denomination}
            onChange={(e) => handleInputChange('denomination', e.target.value)}
            style={styles.select}
          >
            <option value="">Select denomination</option>
            {formData.religionType === 'Christianity' && christianDenominations.map(denom => (
              <option key={denom} value={denom}>{denom}</option>
            ))}
            {formData.religionType === 'Islam' && islamDenominations.map(denom => (
              <option key={denom} value={denom}>{denom}</option>
            ))}
            <option value="Non-denominational">Non-denominational</option>
            <option value="Traditional">Traditional</option>
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
          <label style={styles.label}>Congregation Size</label>
          <select
            value={formData.congregationSize}
            onChange={(e) => handleInputChange('congregationSize', e.target.value)}
            style={styles.select}
          >
            <option value="">Select size</option>
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

  // Add other steps (Contact, Leadership, Services) following the same pattern...

  const steps = [
    { number: 1, title: 'Org Info', component: renderStep1 },
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
              <div style={{...styles.orgIcon, background: '#0EA5E9'}}>⛪</div>
              <div>
                <h1 style={styles.title}>Religious Registration</h1>
                <p style={styles.subtitle}>Register your religious organization with TrendWave Connect</p>
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
                background: '#0EA5E9'
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
                  background: currentStep >= step.number ? '#0EA5E9' : '#E5E7EB',
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
                style={{...styles.primaryButton, background: '#0EA5E9'}}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                style={{...styles.submitButton, background: '#0EA5E9'}}
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
          border-color: #0EA5E9 !important;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

// Use the same styles object structure from previous forms
const styles = {
  // ... Same structure as previous forms with blue theme (#0EA5E9)
};
