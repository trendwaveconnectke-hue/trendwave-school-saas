import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function ProfessionalLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms and Conditions';
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
      const response = await fetch('https://trendwave-backend-zord.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        }),
      });

      const data = await response.json();
      
      if (data.success && data.token) {
        // Store authentication data securely
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('school_id', data.school.id);
        localStorage.setItem('school_name', data.school.name);
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setErrors({ submit: data.message || 'Login failed. Please check your credentials.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
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
          <div style={styles.inputGroup}>
            <label style={styles.label}>School Email Address</label>
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
              autoComplete="username"
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

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

          {/* Terms and Conditions */}
          <div style={styles.termsGroup}>
            <label style={styles.termsLabel}>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                style={styles.checkbox}
              />
              I agree to the <a href="/terms" style={styles.link}>Terms and Conditions</a>
            </label>
            {errors.terms && <span style={styles.errorText}>{errors.terms}</span>}
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
            {isLoading ? 'Signing In...' : 'Sign In to Admin Portal'}
          </button>

          {errors.submit && <span style={styles.errorText}>{errors.submit}</span>}
        </form>

        {/* About Us Section */}
        <div style={styles.aboutSection}>
          <h3 style={styles.aboutTitle}>About TrendWave Connect</h3>
          <p style={styles.aboutText}>
            <strong>Empowering Educational Institutions Across Africa Through Digital Innovation</strong>
          </p>
          <p style={styles.aboutText}>
            TrendWave Connect is a comprehensive school management platform designed specifically for African educational institutions. We provide schools with modern tools to streamline administration, enhance learning experiences, and foster community engagement.
          </p>
          <p style={styles.aboutText}>
            <strong>Our Mission:</strong> To bridge the digital divide in African education by providing affordable, accessible, and locally-relevant technology solutions that transform how schools operate and students learn.
          </p>
          <p style={styles.aboutText}>
            <strong>Built for Africa, Ready for the World</strong> - Our platform understands the unique challenges and opportunities in African education, offering solutions that work within local infrastructure while preparing students for global opportunities.
          </p>
        </div>

        {/* Footer Links */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account? <a href="https://trendwaveconnect.com" style={styles.link}>Visit trendwaveconnect.com</a>
          </p>
          <p style={styles.footerText}>
            <a href="/privacy-policy" style={styles.link}>Privacy Policy</a> • 
            Support: <a href="mailto:support@trendwaveconnect.com" style={styles.link}>support@trendwaveconnect.com</a> • 
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
    maxWidth: '480px',
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
    marginBottom: '32px'
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
  termsGroup: {
    marginBottom: '24px'
  },
  termsLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer'
  },
  checkbox: {
    marginRight: '8px'
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
    transition: 'all 0.2s'
  },
  buttonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed'
  },
  aboutSection: {
    background: '#F8FAFC',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '24px',
    border: '1px solid #E5E7EB'
  },
  aboutTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 16px 0',
    textAlign: 'center'
  },
  aboutText: {
    fontSize: '14px',
    color: '#4B5563',
    lineHeight: '1.6',
    margin: '0 0 12px 0'
  },
  footer: {
    textAlign: 'center',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '24px'
  },
  footerText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 8px 0',
    lineHeight: '1.5'
  },
  link: {
    color: '#1E3A8A',
    textDecoration: 'none',
    fontWeight: '500'
  }
};
