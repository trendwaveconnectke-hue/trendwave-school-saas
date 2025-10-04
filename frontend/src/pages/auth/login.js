import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function ProfessionalLogin() {
  const [formData, setFormData] = useState({
    schoolId: '',
    email: '',
    password: ''
  });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Generate simple math captcha
  const captchaQuestion = "20 + 90";
  const correctAnswer = "110";

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
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (!captchaAnswer) {
      newErrors.captcha = 'Please solve the math problem';
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
      // For now - SIMPLE TEST LOGIN that always works
      // This will be replaced with real API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store fake authentication data (will be real later)
      localStorage.setItem('admin_token', 'fake-token-for-testing');
      localStorage.setItem('school_id', formData.schoolId.toUpperCase());
      localStorage.setItem('school_name', 'Demo School');
      
      // Show success message
      alert('✅ Login successful! Redirecting to dashboard...');
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
      
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <h1 style={styles.title}>TrendWave Connect</h1>
          <p style={styles.subtitle}>School Administration Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          {/* School ID */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>School ID</label>
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
            {errors.schoolId && <span style={styles.errorText}>{errors.schoolId}</span>}
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
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
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
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
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </div>

          {/* reCAPTCHA - Math Problem */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Security Check: {captchaQuestion} = ?</label>
            <input
              type="text"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Enter the answer"
              style={{
                ...styles.input,
                ...(errors.captcha && styles.inputError)
              }}
            />
            {errors.captcha && <span style={styles.errorText}>{errors.captcha}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(isLoading && styles.buttonDisabled)
            }}
          >
            {isLoading ? '🔐 Signing In...' : '🚀 Sign In to Admin Portal'}
          </button>

          {errors.submit && <span style={styles.errorText}>{errors.submit}</span>}
        </form>

        {/* Links */}
        <div style={styles.links}>
          <a href="/auth/forgot-password" style={styles.link}>Forgot Password?</a>
          <span style={styles.separator}>•</span>
          <a href="/privacy-policy" style={styles.link}>Privacy Policy</a>
        </div>

        {/* About Us Section */}
        <div style={styles.aboutSection}>
          <h3 style={styles.aboutTitle}>About TrendWave Connect</h3>
          <p style={styles.aboutText}>
            <strong>Empowering Educational Institutions Across Africa Through Digital Innovation</strong>
          </p>
          <p style={styles.aboutText}>
            TrendWave Connect is a comprehensive school management platform designed specifically for African educational institutions. We provide schools with modern tools to streamline administration, enhance learning experiences, and foster community engagement.
          </p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account? <a href="https://trendwaveconnect.com" style={styles.link}>Visit trendwaveconnect.com</a>
          </p>
          <p style={styles.footerText}>
            Support: <a href="mailto:support@trendwaveconnect.com" style={styles.link}>support@trendwaveconnect.com</a>
          </p>
          <p style={styles.footerText}>
            Contact: <a href="mailto:contact@trendwaveconnect.com" style={styles.link}>contact@trendwaveconnect.com</a>
          </p>
        </div>
      </div>
    </div>
  );
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
    maxWidth: '450px',
    width: '100%',
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    border: '1px solid #e1e5e9'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  logo: {
    width: '64px',
    height: '64px',
    background: '#1E3A8A',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontSize: '28px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 8px 0',
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    color: '#6B7280',
    margin: 0,
    fontSize: '16px',
    fontWeight: '500'
  },
  form: {
    marginBottom: '24px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  errorText: {
    color: '#EF4444',
    fontSize: '14px',
    marginTop: '4px',
    display: 'block'
  },
  button: {
    width: '100%',
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    color: 'white',
    padding: '14px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '8px'
  },
  buttonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed'
  },
  links: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  link: {
    color: '#1E3A8A',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px'
  },
  separator: {
    margin: '0 12px',
    color: '#6B7280'
  },
  aboutSection: {
    background: '#F8FAFC',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '24px',
    border: '1px solid #E5E7EB'
  },
  aboutTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 12px 0',
    textAlign: 'center'
  },
  aboutText: {
    fontSize: '13px',
    color: '#4B5563',
    lineHeight: '1.5',
    margin: '0 0 10px 0'
  },
  footer: {
    textAlign: 'center',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '20px'
  },
  footerText: {
    fontSize: '13px',
    color: '#6B7280',
    margin: '0 0 6px 0',
    lineHeight: '1.4'
  }
};
