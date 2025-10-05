import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Mock data for countries and counties
const continents = [
  { name: 'Africa', code: 'AF' },
  { name: 'Asia', code: 'AS' },
  { name: 'Europe', code: 'EU' },
  { name: 'North America', code: 'NA' },
  { name: 'South America', code: 'SA' },
  { name: 'Oceania', code: 'OC' }
];

const countries = {
  AF: [
    { name: 'Kenya', code: 'KE', counties: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale', 'Garissa', 'Kakamega', 'Bungoma', 'Busia', 'Vihiga', 'Siaya', 'Kisii', 'Nyamira', 'Migori', 'Homa Bay', 'Narok', 'Kajiado', 'Kericho', 'Bomet', 'Sotik', 'Nandi', 'Uasin Gishu', 'Trans Nzoia', 'West Pokot', 'Samburu', 'Turkana', 'Marsabit', 'Wajir', 'Mandera', 'Isiolo', 'Meru', 'Tharaka-Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Taita-Taveta', 'Kwale', 'Kilifi', 'Lamu', 'Tana River'] },
    { name: 'Nigeria', code: 'NG', states: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'] },
    { name: 'Ghana', code: 'GH', regions: ['Greater Accra', 'Ashanti', 'Western', 'Eastern'] },
    { name: 'South Africa', code: 'ZA', provinces: ['Gauteng', 'Western Cape', 'KwaZulu-Natal'] },
    { name: 'Egypt', code: 'EG', governorates: ['Cairo', 'Alexandria', 'Giza'] },
    { name: 'Ethiopia', code: 'ET', regions: ['Addis Ababa', 'Oromia', 'Amhara'] }
  ],
  AS: [
    { name: 'India', code: 'IN', states: ['Maharashtra', 'Delhi', 'Karnataka'] },
    { name: 'China', code: 'CN', provinces: ['Beijing', 'Shanghai', 'Guangdong'] },
    { name: 'United Arab Emirates', code: 'AE', emirates: ['Dubai', 'Abu Dhabi', 'Sharjah'] }
  ],
  EU: [
    { name: 'United Kingdom', code: 'GB', counties: ['London', 'Manchester', 'Birmingham'] },
    { name: 'Germany', code: 'DE', states: ['Berlin', 'Bavaria', 'Hamburg'] },
    { name: 'France', code: 'FR', regions: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur'] }
  ],
  NA: [
    { name: 'United States', code: 'US', states: ['California', 'New York', 'Texas'] },
    { name: 'Canada', code: 'CA', provinces: ['Ontario', 'Quebec', 'British Columbia'] }
  ],
  SA: [
    { name: 'Brazil', code: 'BR', states: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'] },
    { name: 'Argentina', code: 'AR', provinces: ['Buenos Aires', 'Córdoba', 'Santa Fe'] }
  ],
  OC: [
    { name: 'Australia', code: 'AU', states: ['New South Wales', 'Victoria', 'Queensland'] },
    { name: 'New Zealand', code: 'NZ', regions: ['Auckland', 'Wellington', 'Canterbury'] }
  ]
};

const organizationTypes = {
  education: {
    name: 'Educational Institution',
    idPrefix: 'TWCS',
    subtypes: ['Primary School', 'Secondary School', 'College', 'University', 'Training Center', 'Vocational Institute']
  },
  business: {
    name: 'Business Corporation', 
    idPrefix: 'TWCI',
    subtypes: ['Startup', 'Small Business', 'Medium Enterprise', 'Large Corporation', 'Multinational Company']
  },
  healthcare: {
    name: 'Healthcare Organization',
    idPrefix: 'TWCH', 
    subtypes: ['Hospital', 'Clinic', 'Medical Center', 'Dental Practice', 'Pharmacy', 'Laboratory']
  },
  government: {
    name: 'Government Agency',
    idPrefix: 'TWCG',
    subtypes: ['Ministry', 'Department', 'Agency', 'Public Institution', 'Local Government']
  },
  nonprofit: {
    name: 'Non-Profit Organization',
    idPrefix: 'TWCN',
    subtypes: ['NGO', 'Charity', 'Foundation', 'Community Organization', 'Relief Organization']
  },
  religious: {
    name: 'Religious Organization',
    idPrefix: 'TWCC',
    subtypes: ['Church', 'Mosque', 'Temple', 'Synagogue', 'Religious Center']
  },
  industrial: {
    name: 'Industrial Company',
    idPrefix: 'TWCI',
    subtypes: ['Manufacturing', 'Factory', 'Production Plant', 'Industrial Complex']
  },
  association: {
    name: 'Professional Association',
    idPrefix: 'TWCA',
    subtypes: ['Professional Body', 'Union', 'Society', 'Club', 'Association']
  }
};

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '$0',
    duration: '30 days',
    features: [
      'Full platform access',
      'Up to 100 members',
      'Basic analytics',
      'Email support',
      'Mobile app access'
    ],
    recommended: false
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '$49',
    duration: 'per month',
    features: [
      'All Free features',
      'Up to 500 members', 
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access'
    ],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$99',
    duration: 'per month',
    features: [
      'All Basic features',
      'Unlimited members',
      'Advanced reporting',
      '24/7 phone support',
      'White-label solution',
      'Advanced security'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$199',
    duration: 'per month',
    features: [
      'All Pro features',
      'Dedicated account manager',
      'Custom development',
      'SLA guarantee',
      'On-premise deployment',
      'Training & onboarding'
    ],
    recommended: false
  }
];

export default function RegisterNew() {
  const router = useRouter();
  const { type } = router.query;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationType: type || '',
    organizationSubtype: '',
    organizationName: '',
    registrationNumber: '',
    email: '',
    phone: '',
    website: '',
    continent: '',
    country: '',
    county: '',
    address: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPosition: '',
    subscriptionPlan: 'free',
    paymentMethod: '',
    agreeTerms: false
  });

  const [organizationId, setOrganizationId] = useState('');
  const [nameAvailable, setNameAvailable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type && organizationTypes[type]) {
      setFormData(prev => ({ ...prev, organizationType: type }));
      generateOrganizationId(type);
    }
  }, [type]);

  const generateOrganizationId = (orgType) => {
    const prefix = organizationTypes[orgType]?.idPrefix || 'TWC';
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    setOrganizationId(`${prefix}${randomNum}`);
  };

  const checkNameAvailability = async (name) => {
    if (name.length < 3) {
      setNameAvailable(null);
      return;
    }
    
    // Simulate API call
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const available = Math.random() > 0.3; // 70% chance available
    setNameAvailable(available);
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'organizationName') {
      checkNameAvailability(value);
    }
    
    if (field === 'organizationType' && value) {
      generateOrganizationId(value);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate and download PDF
    generatePDFCertificate();
    
    // Send email (simulated)
    sendConfirmationEmail();
    
    setLoading(false);
    setCurrentStep(6); // Success step
  };

  const generatePDFCertificate = () => {
    // In a real app, this would generate an actual PDF
    console.log('Generating PDF certificate for:', formData.organizationName);
    // This would typically use a library like jsPDF or html2pdf
  };

  const sendConfirmationEmail = () => {
    // In a real app, this would send actual emails
    console.log('Sending confirmation emails');
  };

  const downloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob(['PDF Certificate Content'], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `TrendWave-Connect-Certificate-${organizationId}.pdf`;
    document.body.appendChild(element);
    element.click();
  };

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <h3 style={styles.stepTitle}>Organization Information</h3>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Organization Type</label>
        <div style={styles.orgTypeDisplay}>
          <span style={styles.orgTypeBadge}>
            {organizationTypes[formData.organizationType]?.name}
          </span>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Organization Subtype</label>
        <select
          value={formData.organizationSubtype}
          onChange={(e) => handleInputChange('organizationSubtype', e.target.value)}
          style={styles.select}
          required
        >
          <option value="">Select subtype</option>
          {organizationTypes[formData.organizationType]?.subtypes.map(subtype => (
            <option key={subtype} value={subtype}>{subtype}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Organization Name</label>
        <input
          type="text"
          value={formData.organizationName}
          onChange={(e) => handleInputChange('organizationName', e.target.value)}
          placeholder="Enter your organization name"
          style={styles.input}
          required
        />
        {formData.organizationName && (
          <div style={styles.availabilityIndicator}>
            {loading ? (
              <span style={styles.loadingText}>Checking availability...</span>
            ) : nameAvailable === true ? (
              <span style={styles.availableText}>✓ Name is available</span>
            ) : nameAvailable === false ? (
              <span style={styles.unavailableText}>✗ Name is taken</span>
            ) : null}
          </div>
        )}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Registration Number</label>
        <input
          type="text"
          value={formData.registrationNumber}
          onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
          placeholder="Official registration number"
          style={styles.input}
        />
      </div>

      <div style={styles.idDisplay}>
        <span style={styles.idLabel}>Your Organization ID:</span>
        <span style={styles.idValue}>{organizationId}</span>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <h3 style={styles.stepTitle}>Contact Information</h3>
      
      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="organization@email.com"
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
            required
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Website (Optional)</label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          placeholder="https://yourorganization.com"
          style={styles.input}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.stepContainer}>
      <h3 style={styles.stepTitle}>Location Details</h3>
      
      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Continent</label>
          <select
            value={formData.continent}
            onChange={(e) => {
              handleInputChange('continent', e.target.value);
              handleInputChange('country', '');
              handleInputChange('county', '');
            }}
            style={styles.select}
            required
          >
            <option value="">Select continent</option>
            {continents.map(continent => (
              <option key={continent.code} value={continent.code}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Country</label>
          <select
            value={formData.country}
            onChange={(e) => {
              handleInputChange('country', e.target.value);
              handleInputChange('county', '');
            }}
            style={styles.select}
            disabled={!formData.continent}
            required
          >
            <option value="">Select country</option>
            {countries[formData.continent]?.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          {formData.country === 'KE' ? 'County' : 
           formData.country === 'NG' ? 'State' :
           formData.country === 'US' ? 'State' :
           formData.country === 'GB' ? 'County' : 'Region'}
        </label>
        <select
          value={formData.county}
          onChange={(e) => handleInputChange('county', e.target.value)}
          style={styles.select}
          disabled={!formData.country}
          required
        >
          <option value="">Select {formData.country === 'KE' ? 'county' : 'region'}</option>
          {formData.country && countries[formData.continent]?.find(c => c.code === formData.country)?.counties?.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Physical Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter full physical address"
          style={styles.textarea}
          rows="3"
          required
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <h3 style={styles.stepTitle}>Administrator Details</h3>
      
      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            value={formData.adminName}
            onChange={(e) => handleInputChange('adminName', e.target.value)}
            placeholder="Administrator's full name"
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Position</label>
          <input
            type="text"
            value={formData.adminPosition}
            onChange={(e) => handleInputChange('adminPosition', e.target.value)}
            placeholder="e.g., Director, Manager"
            style={styles.input}
            required
          />
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value={formData.adminEmail}
            onChange={(e) => handleInputChange('adminEmail', e.target.value)}
            placeholder="admin@email.com"
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            value={formData.adminPhone}
            onChange={(e) => handleInputChange('adminPhone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            style={styles.input}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div style={styles.stepContainer}>
      <h3 style={styles.stepTitle}>Choose Your Plan</h3>
      <p style={styles.stepSubtitle}>Select the plan that best fits your organization's needs</p>
      
      <div style={styles.plansGrid}>
        {subscriptionPlans.map(plan => (
          <div
            key={plan.id}
            style={{
              ...styles.planCard,
              ...(plan.recommended ? styles.recommendedPlan : {})
            }}
            onClick={() => handleInputChange('subscriptionPlan', plan.id)}
          >
            {plan.recommended && <div style={styles.recommendedBadge}>Recommended</div>}
            
            <div style={styles.planHeader}>
              <h4 style={styles.planName}>{plan.name}</h4>
              <div style={styles.planPrice}>
                <span style={styles.price}>{plan.price}</span>
                <span style={styles.duration}>{plan.duration}</span>
              </div>
            </div>
            
            <div style={styles.planFeatures}>
              {plan.features.map((feature, index) => (
                <div key={index} style={styles.featureItem}>
                  <span style={styles.featureIcon}>✓</span>
                  <span style={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
            
            <div style={styles.planSelector}>
              <input
                type="radio"
                name="subscriptionPlan"
                checked={formData.subscriptionPlan === plan.id}
                onChange={() => handleInputChange('subscriptionPlan', plan.id)}
                style={styles.radio}
              />
              <span style={styles.selectorLabel}>
                {plan.id === 'free' ? 'Start Free Trial' : 'Select Plan'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {formData.subscriptionPlan !== 'free' && (
        <div style={styles.paymentSection}>
          <h4 style={styles.paymentTitle}>Payment Method</h4>
          <div style={styles.paymentMethods}>
            <label style={styles.paymentMethod}>
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={formData.paymentMethod === 'mpesa'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>M-Pesa</span>
            </label>
            
            <label style={styles.paymentMethod}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>Credit/Debit Card</span>
            </label>
            
            <label style={styles.paymentMethod}>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={formData.paymentMethod === 'bank'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>Bank Transfer</span>
            </label>
            
            <label style={styles.paymentMethod}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                style={styles.radio}
              />
              <span style={styles.paymentLabel}>PayPal</span>
            </label>
          </div>
        </div>
      )}

      <div style={styles.termsSection}>
        <label style={styles.termsLabel}>
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
            style={styles.checkbox}
            required
          />
          <span style={styles.termsText}>
            I agree to the <a href="/terms" style={styles.termsLink}>Terms of Service</a> and <a href="/privacy" style={styles.termsLink}>Privacy Policy</a>
          </span>
        </label>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div style={styles.successContainer}>
      <div style={styles.successIcon}>🎉</div>
      <h2 style={styles.successTitle}>Registration Successful!</h2>
      <p style={styles.successMessage}>
        Your organization <strong>{formData.organizationName}</strong> has been registered successfully.
      </p>
      
      <div style={styles.successDetails}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Organization ID:</span>
          <span style={styles.detailValue}>{organizationId}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Plan:</span>
          <span style={styles.detailValue}>
            {subscriptionPlans.find(p => p.id === formData.subscriptionPlan)?.name}
          </span>
        </div>
      </div>

      <div style={styles.successActions}>
        <button
          onClick={downloadPDF}
          style={styles.downloadButton}
        >
          📄 Download Registration Certificate
        </button>
        
        <button
          onClick={() => router.push('/auth/login')}
          style={styles.loginButton}
        >
          Proceed to Admin Login
        </button>
      </div>

      <p style={styles.emailNote}>
        A confirmation email with your registration details has been sent to {formData.email} and {formData.adminEmail}
      </p>
    </div>
  );

  const steps = [
    { number: 1, title: 'Organization', component: renderStep1 },
    { number: 2, title: 'Contact', component: renderStep2 },
    { number: 3, title: 'Location', component: renderStep3 },
    { number: 4, title: 'Administrator', component: renderStep4 },
    { number: 5, title: 'Plan', component: renderStep5 },
    { number: 6, title: 'Complete', component: renderStep6 }
  ];

  if (!type || !organizationTypes[type]) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.errorContainer}>
            <h2>Invalid Organization Type</h2>
            <p>Please select a valid organization type to continue.</p>
            <button
              onClick={() => router.push('/auth/register')}
              style={styles.primaryButton}
            >
              Back to Organization Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <button
            onClick={() => router.push('/auth/register')}
            style={styles.backButton}
          >
            ← Back
          </button>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>
              Register {organizationTypes[formData.organizationType]?.name}
            </h1>
            <p style={styles.subtitle}>Complete your organization registration in a few simple steps</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
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
                <div style={styles.stepNumber}>
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
          {currentStep < 6 && (
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
              
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  style={styles.primaryButton}
                  disabled={!canProceedToNextStep()}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={loading || !formData.agreeTerms}
                >
                  {loading ? 'Processing...' : 'Complete Registration'}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );

  function canProceedToNextStep() {
    switch (currentStep) {
      case 1:
        return formData.organizationSubtype && formData.organizationName && nameAvailable !== false;
      case 2:
        return formData.email && formData.phone;
      case 3:
        return formData.continent && formData.country && formData.county && formData.address;
      case 4:
        return formData.adminName && formData.adminEmail && formData.adminPhone && formData.adminPosition;
      default:
        return true;
    }
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '800px',
    overflow: 'hidden'
  },
  header: {
    padding: '30px 40px 20px',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px 0'
  },
  headerContent: {
    flex: 1
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    color: '#667eea'
  },
  completedStep: {
    color: '#10B981'
  },
  stepNumber: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600'
  },
  form: {
    padding: '40px'
  },
  stepContainer: {
    animation: 'fadeIn 0.5s ease-out'
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 10px 0'
  },
  stepSubtitle: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 25px 0'
  },
  formRow: {
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
    fontFamily: 'inherit'
  },
  orgTypeDisplay: {
    padding: '15px',
    background: '#F0F9FF',
    borderRadius: '8px',
    border: '1px solid #BAE6FD'
  },
  orgTypeBadge: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0369A1'
  },
  availabilityIndicator: {
    marginTop: '5px',
    fontSize: '12px'
  },
  loadingText: {
    color: '#6B7280'
  },
  availableText: {
    color: '#10B981',
    fontWeight: '600'
  },
  unavailableText: {
    color: '#EF4444',
    fontWeight: '600'
  },
  idDisplay: {
    padding: '15px',
    background: '#FFFBEB',
    borderRadius: '8px',
    border: '1px solid #FCD34D',
    textAlign: 'center'
  },
  idLabel: {
    fontSize: '12px',
    color: '#92400E',
    marginRight: '8px'
  },
  idValue: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#D97706'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  planCard: {
    background: 'white',
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    padding: '25px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  recommendedPlan: {
    borderColor: '#667eea',
    transform: 'scale(1.05)',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.15)'
  },
  recommendedBadge: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#667eea',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  planHeader: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  planName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 10px 0'
  },
  planPrice: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '5px'
  },
  price: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#1E3A8A'
  },
  duration: {
    fontSize: '14px',
    color: '#6B7280'
  },
  planFeatures: {
    marginBottom: '20px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '13px'
  },
  featureIcon: {
    color: '#10B981',
    fontWeight: '600'
  },
  featureText: {
    color: '#6B7280'
  },
  planSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  radio: {
    margin: 0
  },
  selectorLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#667eea'
  },
  paymentSection: {
    marginBottom: '25px',
    padding: '20px',
    background: '#F8FAFC',
    borderRadius: '8px'
  },
  paymentTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 15px 0',
    color: '#1F2937'
  },
  paymentMethods: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '10px'
  },
  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    background: 'white',
    borderRadius: '6px',
    border: '1px solid #E5E7EB',
    cursor: 'pointer'
  },
  paymentLabel: {
    fontSize: '13px',
    fontWeight: '500'
  },
  termsSection: {
    marginTop: '25px'
  },
  termsLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    cursor: 'pointer'
  },
  checkbox: {
    marginTop: '2px'
  },
  termsText: {
    fontSize: '14px',
    color: '#6B7280'
  },
  termsLink: {
    color: '#667eea',
    textDecoration: 'none'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #E5E7EB'
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  successContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    animation: 'fadeIn 0.5s ease-out'
  },
  successIcon: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#10B981',
    margin: '0 0 15px 0'
  },
  successMessage: {
    fontSize: '16px',
    color: '#6B7280',
    margin: '0 0 30px 0',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  successDetails: {
    background: '#F0F9FF',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '14px',
    color: '#1F2937',
    fontWeight: '600'
  },
  successActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '300px',
    margin: '0 auto 20px'
  },
  downloadButton: {
    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  loginButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  emailNote: {
    fontSize: '13px',
    color: '#9CA3AF',
    fontStyle: 'italic'
  },
  errorContainer: {
    textAlign: 'center',
    padding: '60px 40px'
  }
};

// Add global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-1px);
    }
    
    .plan-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }
  `;
  document.head.appendChild(style);
}
