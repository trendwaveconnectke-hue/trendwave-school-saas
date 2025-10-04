import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CachedLogin() {
  const [formData, setFormData] = useState({
    schoolId: '',
    email: '',
    password: ''
  });
  const [captcha, setCaptcha] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // Initialize Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Registration Failed'));
    }

    // Load cached credentials if "Remember Me" was checked
    const cachedLogin = localStorage.getItem('cachedLogin');
    if (cachedLogin) {
      const { schoolId, email, remember } = JSON.parse(cachedLogin);
      if (remember) {
        setFormData(prev => ({ ...prev, schoolId, email }));
        setRememberMe(true);
      }
    }

    generateCaptcha();
  }, []);

  // Generate random math captcha
  const generateCaptcha = () => {
    const operations = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    switch(operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      default: answer = num1 + num2;
    }

    setCaptcha({
      question: `${num1} ${operator} ${num2}`,
      answer: answer
    });
    setUserAnswer('');
  };

  // Cache user credentials
  const cacheCredentials = () => {
    if (rememberMe) {
      localStorage.setItem('cachedLogin', JSON.stringify({
        schoolId: formData.schoolId,
        email: formData.email,
        remember: true
      }));
    } else {
      localStorage.removeItem('cachedLogin');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate captcha
    if (parseInt(userAnswer) !== captcha.answer) {
      setErrors({ captcha: 'Incorrect answer. Please try again.' });
      generateCaptcha();
      setIsLoading(false);
      return;
    }

    try {
      // Cache credentials if "Remember Me" is checked
      cacheCredentials();

      // Cache successful login in sessionStorage
      sessionStorage.setItem('loginTime', new Date().toISOString());

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store auth data
      localStorage.setItem('admin_token', 'cached-token-' + Date.now());
      localStorage.setItem('school_id', formData.schoolId);
      localStorage.setItem('school_name', 'Demo School');
      
      // Redirect to dashboard
      window.location.href = '/admin/dashboard';
      
    } catch (error) {
      setErrors({ submit: 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <h1 style={styles.title}>TrendWave Connect</h1>
          <p style={styles.subtitle}>Secure Admin Login</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="School ID (TWC...)"
              value={formData.schoolId}
              onChange={(e) => setFormData({...formData, schoolId: e.target.value})}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={styles.input}
            />
          </div>

          {/* Dynamic Captcha */}
          <div style={styles.captchaSection}>
            <label style={styles.captchaLabel}>
              Security Check: {captcha.question} = ?
            </label>
            <div style={styles.captchaRow}>
              <input
                type="number"
                placeholder="Answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                style={styles.captchaInput}
              />
              <button 
                type="button" 
                onClick={generateCaptcha}
                style={styles.refreshButton}
              >
                🔄
              </button>
            </div>
            {errors.captcha && <span style={styles.error}>{errors.captcha}</span>}
          </div>

          {/* Remember Me */}
          <div style={styles.rememberSection}>
            <label style={styles.rememberLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              Remember my School ID & Email
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            style={styles.submitButton}
          >
            {isLoading ? '🔄 Signing In...' : '🚀 Sign In'}
          </button>

          {errors.submit && <span style={styles.error}>{errors.submit}</span>}
        </form>

        {/* Visitor Section */}
        <div style={styles.visitorSection}>
          <p style={styles.visitorText}>Visitor? Join our platform</p>
          <button style={styles.visitorButton}>
            🌐 Learn More at trendwaveconnect.com
          </button>
        </div>

        {/* Support Section - Bottom Left */}
        <div style={styles.supportSection}>
          <p style={styles.supportTitle}>Issues with login?</p>
          <div style={styles.supportLinks}>
            <a href="mailto:support@trendwaveconnect.com" style={styles.supportLink}>
              📧 Email Support
            </a>
            <a href="tel:+254700000000" style={styles.supportLink}>
              📞 Call Support
            </a>
            <button style={styles.supportLink} onClick={generateCaptcha}>
              🔄 New Security Check
            </button>
          </div>
        </div>
      </div>

      {/* Cache Status Indicator */}
      <div style={styles.cacheStatus}>
        {rememberMe ? '🔒 Credentials cached' : '⚡ Fast login enabled'}
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
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
  },
  loginBox: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '420px',
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  logo: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1E3A8A',
    margin: '0 0 0.5rem 0'
  },
  subtitle: {
    color: '#6B7280',
    margin: 0
  },
  form: {
    marginBottom: '1.5rem'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  input: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #E5E7EB',
    borderRadius: '10px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  captchaSection: {
    marginBottom: '1rem',
    padding: '1rem',
    background: '#F8FAFC',
    borderRadius: '10px'
  },
  captchaLabel: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  },
  captchaRow: {
    display: 'flex',
    gap: '0.5rem'
  },
  captchaInput: {
    flex: 1,
    padding: '0.75rem',
    border: '2px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '1rem'
  },
  refreshButton: {
    background: '#1E3A8A',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  rememberSection: {
    marginBottom: '1.5rem'
  },
  rememberLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#374151',
    cursor: 'pointer'
  },
  checkbox: {
    margin: 0
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '1rem'
  },
  error: {
    color: '#EF4444',
    fontSize: '0.9rem',
    display: 'block',
    textAlign: 'center'
  },
  visitorSection: {
    textAlign: 'center',
    marginBottom: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #E5E7EB'
  },
  visitorText: {
    color: '#6B7280',
    margin: '0 0 0.75rem 0'
  },
  visitorButton: {
    background: 'transparent',
    border: '2px solid #1E3A8A',
    color: '#1E3A8A',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  supportSection: {
    position: 'absolute',
    bottom: '-80px',
    left: '0',
    right: '0',
    textAlign: 'center'
  },
  supportTitle: {
    color: 'white',
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem'
  },
  supportLinks: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  supportLink: {
    color: 'white',
    background: 'rgba(255,255,255,0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '0.8rem',
    border: 'none',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)'
  },
  cacheStatus: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255,255,255,0.9)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    color: '#1E3A8A',
    fontWeight: '500'
  }
};
