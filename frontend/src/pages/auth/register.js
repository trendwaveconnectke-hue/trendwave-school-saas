import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Real Registration Service
const RegistrationService = {
  // Check school name availability
  async checkSchoolName(schoolName) {
    try {
      const response = await fetch('/api/schools/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolName })
      });
      const data = await response.json();
      return { available: data.available, suggestions: data.suggestions || [] };
    } catch (error) {
      return { available: true, suggestions: [] };
    }
  },

  // Validate school registration number
  async validateRegistrationNumber(regNumber, country) {
    try {
      const response = await fetch('/api/schools/validate-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regNumber, country })
      });
      return await response.json();
    } catch (error) {
      return { valid: true, verified: false };
    }
  },

  // Complete school registration
  async registerSchool(schoolData, plan) {
    try {
      const response = await fetch('/api/schools/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...schoolData, plan })
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Registration failed');
    } catch (error) {
      throw new Error('Registration service unavailable. Please try again.');
    }
  },

  // Process payment
  async processPayment(paymentData) {
    try {
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Payment processing unavailable');
    }
  },

  // Get countries list
  getCountries() {
    return [
      { code: 'KE', name: 'Kenya', currency: 'KES', phoneCode: '+254' },
      { code: 'UG', name: 'Uganda', currency: 'UGX', phoneCode: '+256' },
      { code: 'TZ', name: 'Tanzania', currency: 'TZS', phoneCode: '+255' },
      { code: 'RW', name: 'Rwanda', currency: 'RWF', phoneCode: '+250' },
      { code: 'NG', name: 'Nigeria', currency: 'NGN', phoneCode: '+234' },
      { code: 'GH', name: 'Ghana', currency: 'GHS', phoneCode: '+233' },
      { code: 'ZA', name: 'South Africa', currency: 'ZAR', phoneCode: '+27' },
      { code: 'ET', name: 'Ethiopia', currency: 'ETB', phoneCode: '+251' }
    ];
  },

  // Get Kenyan counties
  getKenyanCounties() {
    return [
      'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale',
      'Kakamega', 'Kisii', 'Nyeri', 'Meru', 'Embu', 'Machakos', 'Garissa', 'Lamu',
      'Naivasha', 'Narok', 'Bungoma', 'Busia', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kitui',
      'Laikipia', 'Lamu', 'Makueni', 'Mandera', 'Marsabit', 'Muranga', 'Nyamira', 'Nyandarua',
      'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River', 'Trans Nzoia', 'Turkana', 'Uasin Gishu',
      'Vihiga', 'Wajir', 'West Pokot'
    ];
  },

  // Get school types
  getSchoolTypes() {
    return [
      'Primary School',
      'Secondary School',
      'Primary & Secondary Combined',
      'International School',
      'Private Academy',
      'Public School',
      'Special Needs School',
      'Vocational Training Center',
      'College',
      'University'
    ];
  }
};

// Real Payment Plans
const PAYMENT_PLANS = {
  trial: {
    name: '1 Month Free Trial',
    price: 0,
    duration: '1 month',
    features: [
      'Up to 50 students',
      'Basic student management',
      'Attendance tracking',
      'Fee management (basic)',
      'Parent communication (SMS only)',
      'Basic reports'
    ],
    limitations: [
      'No bulk data upload',
      'No advanced analytics',
      'No custom reports',
      'No API access',
      'No mobile money integration'
    ]
  },
  '2-year': {
    name: '2-Year Professional Plan',
    originalPrice: 158,
    discountedPrice: 130,
    duration: '2 years',
    savings: 'Save 34% + 6 months FREE',
    features: [
      'Up to 500 students',
      'Full student & teacher management',
      'Advanced fee management',
      'Mobile money integration',
      'Bulk data upload (50MB)',
      'Custom reports',
      'API access',
      'Priority support'
    ],
    bonus: '+6 Months Free'
  },
  '5-year': {
    name: '5-Year Enterprise Plan',
    originalPrice: 399,
    discountedPrice: 365,
    duration: '5 years',
    savings: 'Save 24% + 1 year FREE',
    features: [
      'Up to 1,000 students',
      'All Professional features',
      'Advanced analytics',
      'White-label branding',
      'Bulk upload (100MB)',
      'Dedicated support',
      'Custom integrations'
    ],
    bonus: '+1 Year Free'
  },
  '10-year': {
    name: '10-Year Ultimate Plan',
    originalPrice: 799,
    discountedPrice: 750,
    duration: '10 years',
    savings: 'Save 28% + 3 years FREE',
    features: [
      'Unlimited students',
      'All Enterprise features',
      'AI-powered analytics',
      'Full white-label solution',
      'Bulk upload (500MB)',
      '24/7 dedicated support',
      'Custom development'
    ],
    bonus: '+3 Years Free'
  }
};

// Real Form Validation
const validateForm = (formData, step) => {
  const errors = {};

  if (step === 1) {
    if (!formData.schoolName?.trim()) {
      errors.schoolName = 'School name is required';
    } else if (formData.schoolName.length < 3) {
      errors.schoolName = 'School name must be at least 3 characters';
    }

    if (!formData.schoolType) {
      errors.schoolType = 'Please select school type';
    }

    if (!formData.registrationNumber?.trim()) {
      errors.registrationNumber = 'Registration number is required';
    }

    if (!formData.country) {
      errors.country = 'Please select country';
    }

    if (formData.country === 'KE' && !formData.county) {
      errors.county = 'Please select county';
    }

    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (step === 2) {
    if (!formData.adminName?.trim()) {
      errors.adminName = 'Administrator name is required';
    }

    if (!formData.adminEmail?.trim()) {
      errors.adminEmail = 'Administrator email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      errors.adminEmail = 'Please enter a valid email address';
    }

    if (!formData.adminPhone?.trim()) {
      errors.adminPhone = 'Administrator phone is required';
    }

    if (!formData.adminPosition) {
      errors.adminPosition = 'Please select your position';
    }
  }

  if (step === 3) {
    if (!formData.plan) {
      errors.plan = 'Please select a subscription plan';
    }
  }

  return errors;
};

export default function SchoolRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // School Information
    schoolName: '',
    schoolType: '',
    registrationNumber: '',
    country: 'KE',
    county: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    establishedYear: new Date().getFullYear(),
    
    // Administrator Information
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPosition: '',
    
    // Subscription
    plan: 'trial',
    
    // Payment
    paymentMethod: 'mpesa',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [schoolNameAvailable, setSchoolNameAvailable] = useState(null);
  const [registrationValid, setRegistrationValid] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // Check school name availability
  useEffect(() => {
    const checkSchoolName = async () => {
      if (formData.schoolName.length > 2) {
        setCheckingAvailability(true);
        const result = await RegistrationService.checkSchoolName(formData.schoolName);
        setSchoolNameAvailable(result.available);
        setCheckingAvailability(false);
      }
    };

    const delayDebounce = setTimeout(checkSchoolName, 1000);
    return () => clearTimeout(delayDebounce);
  }, [formData.schoolName]);

  // Validate registration number
  useEffect(() => {
    const validateRegNumber = async () => {
      if (formData.registrationNumber.length > 3) {
        const result = await RegistrationService.validateRegistrationNumber(
          formData.registrationNumber,
          formData.country
        );
        setRegistrationValid(result.valid);
      }
    };

    const delayDebounce = setTimeout(validateRegNumber, 1500);
    return () => clearTimeout(delayDebounce);
  }, [formData.registrationNumber, formData.country]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNextStep = () => {
    const validationErrors = validateForm(formData, currentStep);
    
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, 3);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!formData.agreeTerms) {
      setErrors({ agreeTerms: 'You must agree to the terms and conditions' });
      return;
    }

    setIsLoading(true);

    try {
      // Process payment if not trial
      let paymentResult = null;
      if (formData.plan !== 'trial') {
        paymentResult = await RegistrationService.processPayment({
          plan: formData.plan,
          amount: PAYMENT_PLANS[formData.plan].discountedPrice,
          currency: 'USD',
          method: formData.paymentMethod,
          schoolName: formData.schoolName
        });
      }

      // Complete registration
      const registrationResult = await RegistrationService.registerSchool(formData, formData.plan);
      
      // Store school data and redirect to dashboard
      localStorage.setItem('admin_token', registrationResult.token);
      localStorage.setItem('school_id', registrationResult.school.id);
      localStorage.setItem('school_name', registrationResult.school.name);
      localStorage.setItem('school_plan', formData.plan);
      
      router.push('/admin/dashboard?welcome=true');
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const renderProgressSteps = () => (
    <div style={styles.progressContainer}>
      {[1, 2, 3, 4].map((step) => (
        <div key={step} style={styles.progressStep}>
          <div
            style={{
              ...styles.progressCircle,
              ...(currentStep >= step ? styles.progressCircleActive : {}),
              ...(currentStep === step ? styles.progressCircleCurrent : {})
            }}
          >
            {step}
          </div>
          <div style={styles.progressLabel}>
            {step === 1 && 'School Info'}
            {step === 2 && 'Administrator'}
            {step === 3 && 'Subscription'}
            {step === 4 && 'Payment'}
          </div>
          {step < 4 && (
            <div
              style={{
                ...styles.progressLine,
                ...(currentStep > step ? styles.progressLineActive : {})
              }}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <GlobalStyles />
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            🎓 TrendWave Connect
          </div>
          <button 
            style={styles.loginButton}
            onClick={() => router.push('/auth/login')}
          >
            Already have an account? Login
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.registrationCard}>
          {/* Progress Steps */}
          {renderProgressSteps()}

          {/* Step 1: School Information */}
          {currentStep === 1 && (
            <div style={styles.stepContent}>
              <div style={styles.stepHeader}>
                <h1 style={styles.stepTitle}>School Information</h1>
                <p style={styles.stepSubtitle}>
                  Tell us about your school. This information will be used to create your school profile.
                </p>
              </div>

              <div style={styles.formGrid}>
                {/* School Name */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    School Name *
                    {checkingAvailability && (
                      <span style={styles.checkingText}>Checking availability...</span>
                    )}
                    {schoolNameAvailable === false && (
                      <span style={styles.errorText}>Name already taken</span>
                    )}
                    {schoolNameAvailable === true && (
                      <span style={styles.successText}>Name available</span>
                    )}
                  </label>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(schoolNameAvailable === false && styles.inputError),
                      ...(schoolNameAvailable === true && styles.inputSuccess)
                    }}
                    placeholder="Excel Academy Nairobi"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  />
                  {errors.schoolName && (
                    <span style={styles.errorText}>{errors.schoolName}</span>
                  )}
                </div>

                {/* School Type */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>School Type *</label>
                  <select
                    style={styles.select}
                    value={formData.schoolType}
                    onChange={(e) => handleInputChange('schoolType', e.target.value)}
                  >
                    <option value="">Select school type</option>
                    {RegistrationService.getSchoolTypes().map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.schoolType && (
                    <span style={styles.errorText}>{errors.schoolType}</span>
                  )}
                </div>

                {/* Registration Number */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Registration Number *
                    {registrationValid === false && (
                      <span style={styles.errorText}>Invalid registration number</span>
                    )}
                    {registrationValid === true && (
                      <span style={styles.successText}>Valid registration</span>
                    )}
                  </label>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(registrationValid === false && styles.inputError),
                      ...(registrationValid === true && styles.inputSuccess)
                    }}
                    placeholder="MOE/1234/2024"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  />
                  {errors.registrationNumber && (
                    <span style={styles.errorText}>{errors.registrationNumber}</span>
                  )}
                </div>

                {/* Established Year */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Year Established</label>
                  <select
                    style={styles.select}
                    value={formData.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  >
                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Country *</label>
                  <select
                    style={styles.select}
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <option value="">Select country</option>
                    {RegistrationService.getCountries().map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <span style={styles.errorText}>{errors.country}</span>
                  )}
                </div>

                {/* County (Kenya only) */}
                {formData.country === 'KE' && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>County *</label>
                    <select
                      style={styles.select}
                      value={formData.county}
                      onChange={(e) => handleInputChange('county', e.target.value)}
                    >
                      <option value="">Select county</option>
                      {RegistrationService.getKenyanCounties().map(county => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                    {errors.county && (
                      <span style={styles.errorText}>{errors.county}</span>
                    )}
                  </div>
                )}

                {/* Address */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Physical Address</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="School street address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>School Phone *</label>
                  <input
                    type="tel"
                    style={styles.input}
                    placeholder="+254 712 345 678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  {errors.phone && (
                    <span style={styles.errorText}>{errors.phone}</span>
                  )}
                </div>

                {/* Email */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>School Email *</label>
                  <input
                    type="email"
                    style={styles.input}
                    placeholder="admin@schoolname.ac.ke"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <span style={styles.errorText}>{errors.email}</span>
                  )}
                </div>

                {/* Website */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Website (Optional)</label>
                  <input
                    type="url"
                    style={styles.input}
                    placeholder="https://www.schoolname.ac.ke"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>

              <div style={styles.stepActions}>
                <button
                  style={styles.primaryButton}
                  onClick={handleNextStep}
                >
                  Continue to Administrator Details →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Administrator Information */}
          {currentStep === 2 && (
            <div style={styles.stepContent}>
              <div style={styles.stepHeader}>
                <h1 style={styles.stepTitle}>Administrator Information</h1>
                <p style={styles.stepSubtitle}>
                  Provide details for the primary administrator who will manage the school account.
                </p>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="John Kamau"
                    value={formData.adminName}
                    onChange={(e) => handleInputChange('adminName', e.target.value)}
                  />
                  {errors.adminName && (
                    <span style={styles.errorText}>{errors.adminName}</span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    style={styles.input}
                    placeholder="john.kamau@school.ac.ke"
                    value={formData.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  />
                  {errors.adminEmail && (
                    <span style={styles.errorText}>{errors.adminEmail}</span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    style={styles.input}
                    placeholder="+254 712 345 678"
                    value={formData.adminPhone}
                    onChange={(e) => handleInputChange('adminPhone', e.target.value)}
                  />
                  {errors.adminPhone && (
                    <span style={styles.errorText}>{errors.adminPhone}</span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Position *</label>
                  <select
                    style={styles.select}
                    value={formData.adminPosition}
                    onChange={(e) => handleInputChange('adminPosition', e.target.value)}
                  >
                    <option value="">Select your position</option>
                    <option value="Principal">Principal/Head Teacher</option>
                    <option value="Deputy Principal">Deputy Principal</option>
                    <option value="Director">School Director</option>
                    <option value="Administrator">School Administrator</option>
                    <option value="Bursar">Bursar</option>
                    <option value="IT Manager">IT Manager</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.adminPosition && (
                    <span style={styles.errorText}>{errors.adminPosition}</span>
                  )}
                </div>
              </div>

              <div style={styles.stepActions}>
                <button
                  style={styles.secondaryButton}
                  onClick={handlePreviousStep}
                >
                  ← Back to School Info
                </button>
                <button
                  style={styles.primaryButton}
                  onClick={handleNextStep}
                >
                  Continue to Subscription →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Subscription Plan */}
          {currentStep === 3 && (
            <div style={styles.stepContent}>
              <div style={styles.stepHeader}>
                <h1 style={styles.stepTitle}>Choose Your Plan</h1>
                <p style={styles.stepSubtitle}>
                  Select the subscription plan that best fits your school's needs. Start with a free trial!
                </p>
              </div>

              <div style={styles.plansGrid}>
                {Object.entries(PAYMENT_PLANS).map(([planKey, plan]) => (
                  <div
                    key={planKey}
                    style={{
                      ...styles.planCard,
                      ...(formData.plan === planKey && styles.planCardSelected)
                    }}
                    onClick={() => handleInputChange('plan', planKey)}
                  >
                    {plan.bonus && (
                      <div style={styles.planBonus}>{plan.bonus}</div>
                    )}
                    
                    <h3 style={styles.planName}>{plan.name}</h3>
                    
                    <div style={styles.planPrice}>
                      {plan.price === 0 ? (
                        <span style={styles.freePrice}>FREE</span>
                      ) : (
                        <>
                          <span style={styles.discountedPrice}>
                            ${plan.discountedPrice}
                          </span>
                          {plan.originalPrice && (
                            <span style={styles.originalPrice}>
                              ${plan.originalPrice}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div style={styles.planDuration}>{plan.duration}</div>
                    
                    {plan.savings && (
                      <div style={styles.planSavings}>{plan.savings}</div>
                    )}

                    <div style={styles.planFeatures}>
                      <h4 style={styles.featuresTitle}>Features:</h4>
                      {plan.features.map((feature, index) => (
                        <div key={index} style={styles.featureItem}>
                          ✅ {feature}
                        </div>
                      ))}
                      
                      {plan.limitations && (
                        <>
                          <h4 style={styles.limitationsTitle}>Limitations:</h4>
                          {plan.limitations.map((limitation, index) => (
                            <div key={index} style={styles.limitationItem}>
                              ❌ {limitation}
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <div style={styles.planSelector}>
                      <div
                        style={{
                          ...styles.radioButton,
                          ...(formData.plan === planKey && styles.radioButtonSelected)
                        }}
                      >
                        {formData.plan === planKey && '✓'}
                      </div>
                      <span style={styles.selectorText}>
                        {formData.plan === planKey ? 'Selected' : 'Select Plan'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {errors.plan && (
                <div style={styles.errorBanner}>{errors.plan}</div>
              )}

              <div style={styles.stepActions}>
                <button
                  style={styles.secondaryButton}
                  onClick={handlePreviousStep}
                >
                  ← Back to Administrator
                </button>
                <button
                  style={styles.primaryButton}
                  onClick={handleNextStep}
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment & Confirmation */}
          {currentStep === 4 && (
            <div style={styles.stepContent}>
              <div style={styles.stepHeader}>
                <h1 style={styles.stepTitle}>Payment & Confirmation</h1>
                <p style={styles.stepSubtitle}>
                  {formData.plan === 'trial' 
                    ? 'Start your free trial - no payment required!'
                    : 'Complete your subscription payment'
                  }
                </p>
              </div>

              {/* Order Summary */}
              <div style={styles.orderSummary}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>
                <div style={styles.summaryGrid}>
                  <div style={styles.summaryRow}>
                    <span>School:</span>
                    <span>{formData.schoolName}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Plan:</span>
                    <span>{PAYMENT_PLANS[formData.plan].name}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Duration:</span>
                    <span>{PAYMENT_PLANS[formData.plan].duration}</span>
                  </div>
                  {formData.plan !== 'trial' && (
                    <>
                      <div style={styles.summaryRow}>
                        <span>Amount:</span>
                        <span>${PAYMENT_PLANS[formData.plan].discountedPrice} USD</span>
                      </div>
                      <div style={styles.summaryRow}>
                        <span>Savings:</span>
                        <span style={styles.savingsText}>
                          {PAYMENT_PLANS[formData.plan].savings}
                        </span>
                      </div>
                    </>
                  )}
                  <div style={styles.summaryTotal}>
                    <span>Total:</span>
                    <span>
                      {formData.plan === 'trial' ? 'FREE' : `$${PAYMENT_PLANS[formData.plan].discountedPrice} USD`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              {formData.plan !== 'trial' && (
                <div style={styles.paymentSection}>
                  <h3 style={styles.sectionTitle}>Payment Method</h3>
                  <div style={styles.paymentMethods}>
                    <div
                      style={{
                        ...styles.paymentMethod,
                        ...(formData.paymentMethod === 'mpesa' && styles.paymentMethodSelected)
                      }}
                      onClick={() => handleInputChange('paymentMethod', 'mpesa')}
                    >
                      <div style={styles.paymentIcon}>📱</div>
                      <div style={styles.paymentInfo}>
                        <div style={styles.paymentName}>M-Pesa</div>
                        <div style={styles.paymentDescription}>
                          Pay via M-Pesa (Kenya)
                        </div>
                      </div>
                      <div style={styles.paymentRadio}>
                        {formData.paymentMethod === 'mpesa' && '✓'}
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.paymentMethod,
                        ...(formData.paymentMethod === 'card' && styles.paymentMethodSelected)
                      }}
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                    >
                      <div style={styles.paymentIcon}>💳</div>
                      <div style={styles.paymentInfo}>
                        <div style={styles.paymentName}>Credit/Debit Card</div>
                        <div style={styles.paymentDescription}>
                          Visa, MasterCard, American Express
                        </div>
                      </div>
                      <div style={styles.paymentRadio}>
                        {formData.paymentMethod === 'card' && '✓'}
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.paymentMethod,
                        ...(formData.paymentMethod === 'bank' && styles.paymentMethodSelected)
                      }}
                      onClick={() => handleInputChange('paymentMethod', 'bank')}
                    >
                      <div style={styles.paymentIcon}>🏦</div>
                      <div style={styles.paymentInfo}>
                        <div style={styles.paymentName}>Bank Transfer</div>
                        <div style={styles.paymentDescription}>
                          Direct bank transfer
                        </div>
                      </div>
                      <div style={styles.paymentRadio}>
                        {formData.paymentMethod === 'bank' && '✓'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div style={styles.termsSection}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>
                    I agree to the{' '}
                    <a href="/terms" style={styles.link}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" style={styles.link}>Privacy Policy</a>.
                    I understand that my school data will be managed in accordance 
                    with these policies.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span style={styles.errorText}>{errors.agreeTerms}</span>
                )}
              </div>

              {errors.submit && (
                <div style={styles.errorBanner}>{errors.submit}</div>
              )}

              <div style={styles.stepActions}>
                <button
                  style={styles.secondaryButton}
                  onClick={handlePreviousStep}
                >
                  ← Back to Plans
                </button>
                <button
                  style={{
                    ...styles.primaryButton,
                    ...(isLoading && styles.buttonLoading)
                  }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div style={styles.spinner}></div>
                      {formData.plan === 'trial' ? 'Setting up your school...' : 'Processing payment...'}
                    </>
                  ) : (
                    formData.plan === 'trial' ? '🎉 Start Free Trial' : '💳 Complete Payment & Register'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Real Professional Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 0'
  },
  
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem'
  },
  
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  
  loginButton: {
    background: 'none',
    border: '2px solid #667eea',
    color: '#667eea',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#667eea',
      color: 'white'
    }
  },
  
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '2rem 1rem',
    minHeight: 'calc(100vh - 80px)'
  },
  
  registrationCard: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    padding: '3rem',
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3rem',
    position: 'relative'
  },
  
  progressStep: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  
  progressCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#64748b',
    border: '3px solid #f1f5f9',
    transition: 'all 0.3s ease',
    zIndex: 2
  },
  
  progressCircleActive: {
    background: '#667eea',
    color: 'white',
    borderColor: '#667eea'
  },
  
  progressCircleCurrent: {
    transform: 'scale(1.1)',
    boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.2)'
  },
  
  progressLabel: {
    position: 'absolute',
    top: '100%',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  
  progressLine: {
    width: '100px',
    height: '3px',
    background: '#f1f5f9',
    margin: '0 1rem',
    transition: 'all 0.3s ease'
  },
  
  progressLineActive: {
    background: '#667eea'
  },
  
  stepContent: {
    animation: 'fadeInUp 0.6s ease-out'
  },
  
  stepHeader: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  
  stepTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 1rem 0',
    background: 'linear-gradient(135deg, #1e293b, #334155)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  
  stepSubtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.6'
  },
  
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  input: {
    padding: '0.875rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: 'white',
    ':focus': {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    }
  },
  
  inputError: {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
  },
  
  inputSuccess: {
    borderColor: '#10b981',
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
  },
  
  select: {
    padding: '0.875rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '1rem',
    background: 'white',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    }
  },
  
  errorText: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    fontWeight: '500'
  },
  
  successText: {
    color: '#10b981',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  
  checkingText: {
    color: '#f59e0b',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  
  stepActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3rem',
    gap: '1rem'
  },
  
  primaryButton: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
    },
    ':disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'none'
    }
  },
  
  buttonLoading: {
    opacity: 0.8,
    cursor: 'not-allowed'
  },
  
  secondaryButton: {
    background: 'white',
    color: '#64748b',
    border: '2px solid #e5e7eb',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#667eea',
      color: '#667eea',
      transform: 'translateY(-2px)'
    }
  },
  
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  
  planCard: {
    background: 'white',
    border: '3px solid #f1f5f9',
    borderRadius: '16px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    ':hover': {
      transform: 'translateY(-5px)',
      borderColor: '#667eea',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
    }
  },
  
  planCardSelected: {
    borderColor: '#667eea',
    background: 'linear-gradient(135deg, #f8faff, white)',
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.2)'
  },
  
  planBonus: {
    position: 'absolute',
    top: '-10px',
    right: '1rem',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white',
    padding: '0.25rem 1rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
  
  planName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 1rem 0'
  },
  
  planPrice: {
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.5rem'
  },
  
  freePrice: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#10b981'
  },
  
  discountedPrice: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e293b'
  },
  
  originalPrice: {
    fontSize: '1.125rem',
    color: '#94a3b8',
    textDecoration: 'line-through'
  },
  
  planDuration: {
    color: '#64748b',
    marginBottom: '1rem'
  },
  
  planSavings: {
    color: '#10b981',
    fontWeight: '600',
    marginBottom: '1.5rem'
  },
  
  planFeatures: {
    marginBottom: '2rem'
  },
  
  featuresTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 0.5rem 0'
  },
  
  limitationsTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#ef4444',
    margin: '1rem 0 0.5rem 0'
  },
  
  featureItem: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '0.25rem'
  },
  
  limitationItem: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    marginBottom: '0.25rem'
  },
  
  planSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  
  radioButton: {
    width: '20px',
    height: '20px',
    border: '2px solid #d1d5db',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  
  radioButtonSelected: {
    background: '#667eea',
    borderColor: '#667eea'
  },
  
  selectorText: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500'
  },
  
  errorBanner: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontWeight: '500'
  },
  
  orderSummary: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem'
  },
  
  summaryTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 1rem 0'
  },
  
  summaryGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e5e7eb'
  },
  
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#1e293b',
    fontSize: '1.125rem',
    paddingTop: '0.75rem'
  },
  
  savingsText: {
    color: '#10b981',
    fontWeight: '600'
  },
  
  paymentSection: {
    marginBottom: '2rem'
  },
  
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 1rem 0'
  },
  
  paymentMethods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  
  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#667eea',
      transform: 'translateY(-2px)'
    }
  },
  
  paymentMethodSelected: {
    borderColor: '#667eea',
    background: 'linear-gradient(135deg, #f8faff, white)'
  },
  
  paymentIcon: {
    fontSize: '2rem'
  },
  
  paymentInfo: {
    flex: 1
  },
  
  paymentName: {
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem'
  },
  
  paymentDescription: {
    color: '#64748b',
    fontSize: '0.875rem'
  },
  
  paymentRadio: {
    width: '20px',
    height: '20px',
    border: '2px solid #d1d5db',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  
  termsSection: {
    marginBottom: '2rem'
  },
  
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    cursor: 'pointer'
  },
  
  checkbox: {
    marginTop: '0.25rem'
  },
  
  checkboxText: {
    color: '#64748b',
    lineHeight: '1.5'
  },
  
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Global Styles Component
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    button {
      font-family: inherit;
    }
    
    input, select {
      font-family: inherit;
    }
  `}</style>
);
