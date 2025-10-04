import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ModernProfessionalLogin() {
  const [formData, setFormData] = useState({
    schoolId: '',
    email: '',
    password: ''
  });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Welcome messages that scroll
  const welcomeMessages = [
    "🎓 Welcome to Africa's Leading School Platform",
    "🚀 Transforming Education Through Technology", 
    "🌍 Connecting Schools Across the Continent",
    "💡 Smart Tools for Modern Education",
    "🔒 Bank-Grade Security for Your Data"
  ];

  // Generate simple math captcha
  const captchaQuestion = "20 + 90";
  const correctAnswer = "110";

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate welcome messages
    const interval = setInterval(() => {
      setCurrentWelcomeIndex((prev) => (prev + 1) % welcomeMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.schoolId) {
      newErrors.schoolId = 'School ID is required';
    } else if (!formData.schoolId.startsWith('TWC')) {
      newErrors.schoolId = 'School ID must start with TWC';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!captchaAnswer) {
      newErrors.captcha = 'Please solve the security check';
    } else if (captchaAnswer !== correctAnswer) {
      newErrors.captcha = 'Incorrect answer. Please try again.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with beautiful loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store authentication data
      localStorage.setItem('admin_token', 'secure-jwt-token');
      localStorage.setItem('school_id', formData.schoolId.toUpperCase());
      localStorage.setItem('school_name', 'TrendWave Connect School');
      
      // Show success with animation
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 500);
      
    } catch (error) {
      setErrors({ submit: 'Login failed. Please check your credentials and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('📧 Password reset feature coming soon! Contact support@trendwaveconnect.com');
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animatedBackground}></div>
      
      {/* Main Content */}
      <div style={{
        ...styles.content,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}>
        
        {/* Left Side - Branding */}
        <div style={styles.leftPanel}>
          <div style={styles.brandSection}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>🎓</div>
              <h1 style={styles.brandTitle}>TrendWave Connect</h1>
            </div>
            
            {/* Animated Welcome Messages */}
            <div style={styles.welcomeContainer}>
              <div key={currentWelcomeIndex} style={styles.welcomeMessage}>
                {welcomeMessages[currentWelcomeIndex]}
              </div>
            </div>

            {/* Features List */}
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✅</span>
                <span>Complete School Management</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✅</span>
                <span>Real-time Analytics & Reports</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✅</span>
                <span>Mobile Apps for Students & Parents</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✅</span>
                <span>Secure Payment Processing</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✅</span>
                <span>24/7 Professional Support</span>
              </div>
            </div>

            {/* Stats */}
            <div style={styles.stats}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>100+</div>
                <div style={styles.statLabel}>Schools</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>50K+</div>
                <div style={styles.statLabel}>Students</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>15+</div>
                <div style={styles.statLabel}>Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={styles.rightPanel}>
          <div style={styles.loginCard}>
            {/* Login Header */}
            <div style={styles.loginHeader}>
              <h2 style={styles.loginTitle}>Admin Portal Access</h2>
              <p style={styles.loginSubtitle}>Sign in to manage your school</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} style={styles.form}>
              {/* School ID */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🏫</span>
                  School ID
                </label>
                <input
                  type="text"
                  name="schoolId"
                  value={formData.schoolId}
                  onChange={handleInputChange}
                  placeholder="TWC0001"
                  style={{
                    ...styles.input,
                    ...(errors.schoolId && styles.inputError)
                  }}
                  autoComplete="username"
                />
                {errors.schoolId && (
                  <div style={styles.errorMessage}>
                    <span style={styles.errorIcon}>⚠️</span>
                    {errors.schoolId}
                  </div>
                )}
              </div>

              {/* Email */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@yourschool.edu"
                  style={{
                    ...styles.input,
                    ...(errors.email && styles.inputError)
                  }}
                  autoComplete="email"
                />
                {errors.email && (
                  <div style={styles.errorMessage}>
                    <span style={styles.errorIcon}>⚠️</span>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🔒</span>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  style={{
                    ...styles.input,
                    ...(errors.password && styles.inputError)
                  }}
                  autoComplete="current-password"
                />
                {errors.password && (
                  <div style={styles.errorMessage}>
                    <span style={styles.errorIcon}>⚠️</span>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Security Check */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🛡️</span>
                  Security Check
                </label>
                <div style={styles.captchaContainer}>
                  <div style={styles.captchaQuestion}>
                    {captchaQuestion} = ?
                  </div>
                  <input
                    type="text"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Your answer"
                    style={{
                      ...styles.input,
                      ...(errors.captcha && styles.inputError)
                    }}
                  />
                </div>
                {errors.captcha && (
                  <div style={styles.errorMessage}>
                    <span style={styles.errorIcon}>⚠️</span>
                    {errors.captcha}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  ...(isLoading && styles.submitButtonLoading)
                }}
              >
                {isLoading ? (
                  <>
                    <div style={styles.buttonSpinner}></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span style={styles.buttonIcon}>🚀</span>
                    Access Admin Portal
                  </>
                )}
              </button>

              {errors.submit && (
                <div style={styles.submitError}>
                  <span style={styles.errorIcon}>❌</span>
                  {errors.submit}
                </div>
              )}
            </form>

            {/* Help Links */}
            <div style={styles.helpSection}>
              <button onClick={handleForgotPassword} style={styles.helpLink}>
                🔓 Forgot your password?
              </button>
              <div style={styles.divider}>•</div>
              <a href="/privacy-policy" style={styles.helpLink}>
                📄 Privacy Policy
              </a>
            </div>

            {/* Support Info */}
            <div style={styles.supportSection}>
              <p style={styles.supportText}>
                Need help? Contact our support team:
              </p>
              <div style={styles.contactLinks}>
                <a href="mailto:support@trendwaveconnect.com" style={styles.contactLink}>
                  📧 support@trendwaveconnect.com
                </a>
                <a href="mailto:contact@trendwaveconnect.com" style={styles.contactLink}>
                  📞 contact@trendwaveconnect.com
                </a>
              </div>
            </div>

            {/* Website Link */}
            <div style={styles.websiteLink}>
              <a href="https://trendwaveconnect.com" style={styles.websiteButton}>
                🌐 Visit Our Main Website
              </a>
            </div>
          </div>
        </div>
      </div>

      <GlobalStyles />
    </div>
  );
}

// Global Styles Component
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
);

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
    animation: 'pulse 8s ease-in-out infinite'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '700px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    boxShadow: '0 20px 80px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    margin: '20px',
    transition: 'all 0.8s ease-out'
  },
  leftPanel: {
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    color: 'white',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  brandSection: {
    position: 'relative',
    zIndex: 2
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  logoIcon: {
    fontSize: '3rem',
    animation: 'float 3s ease-in-out infinite'
  },
  brandTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: 0,
    background: 'linear-gradient(45deg, #fff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  welcomeContainer: {
    height: '60px',
    marginBottom: '2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  welcomeMessage: {
    fontSize: '1.5rem',
    fontWeight: '600',
    animation: 'fadeIn 1s ease-out',
    position: 'absolute',
    width: '100%',
    textAlign: 'left'
  },
  featuresList: {
    marginBottom: '3rem'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    opacity: '0.9'
  },
  featureIcon: {
    fontSize: '1.1rem'
  },
  stats: {
    display: 'flex',
    gap: '2rem'
  },
  stat: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: '800',
    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: '0.8'
  },
  rightPanel: {
    padding: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px'
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '2.5rem'
  },
  loginTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 0.5rem 0'
  },
  loginSubtitle: {
    color: '#6B7280',
    fontSize: '1rem',
    margin: 0
  },
  form: {
    marginBottom: '2rem'
  },
  inputGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  labelIcon: {
    fontSize: '1rem'
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    background: 'white'
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#EF4444',
    fontSize: '0.8rem',
    marginTop: '0.5rem'
  },
  errorIcon: {
    fontSize: '0.8rem'
  },
  captchaContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  captchaQuestion: {
    background: '#1E3A8A',
    color: 'white',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    fontWeight: '600',
    minWidth: '100px',
    textAlign: 'center'
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    color: 'white',
    border: 'none',
    padding: '1.25rem 2rem',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)'
  },
  submitButtonLoading: {
    opacity: '0.8',
    cursor: 'not-allowed'
  },
  buttonSpinner: {
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite'
  },
  buttonIcon: {
    fontSize: '1.2rem'
  },
  submitError: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: '#FEF2F2',
    color: '#DC2626',
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1rem',
    fontSize: '0.9rem'
  },
  helpSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  helpLink: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  divider: {
    color: '#D1D5DB'
  },
  supportSection: {
    background: '#F8FAFC',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '1.5rem'
  },
  supportText: {
    color: '#6B7280',
    fontSize: '0.9rem',
    margin: '0 0 0.75rem 0',
    textAlign: 'center'
  },
  contactLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'center'
  },
  contactLink: {
    color: '#1E3A8A',
    fontSize: '0.85rem',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  websiteLink: {
    textAlign: 'center'
  },
  websiteButton: {
    background: 'transparent',
    border: '2px solid #1E3A8A',
    color: '#1E3A8A',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-block'
  }
};

// Add hover effects
Object.assign(styles.submitButton, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(30, 58, 138, 0.4)'
  }
});

Object.assign(styles.helpLink, {
  ':hover': {
    color: '#1E3A8A'
  }
});

Object.assign(styles.contactLink, {
  ':hover': {
    color: '#3730A3'
  }
});

Object.assign(styles.websiteButton, {
  ':hover': {
    background: '#1E3A8A',
    color: 'white',
    transform: 'translateY(-1px)'
  }
});

Object.assign(styles.input, {
  ':focus': {
    outline: 'none',
    borderColor: '#1E3A8A',
    boxShadow: '0 0 0 3px rgba(30, 58, 138, 0.1)'
  }
});
