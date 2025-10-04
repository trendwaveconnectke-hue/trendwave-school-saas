import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CompactLogin() {
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

  useEffect(() => {
    generateCaptcha();
    
    // Load cached credentials
    const cached = localStorage.getItem('cachedLogin');
    if (cached) {
      const { schoolId, email, remember } = JSON.parse(cached);
      if (remember) {
        setFormData(prev => ({ ...prev, schoolId, email }));
        setRememberMe(true);
      }
    }
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 1;
    const num2 = Math.floor(Math.random() * 8) + 1;
    const answer = num1 + num2;
    
    setCaptcha({ question: `${num1} + ${num2}`, answer });
    setUserAnswer('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (parseInt(userAnswer) !== captcha.answer) {
      setErrors({ captcha: 'Wrong answer' });
      generateCaptcha();
      setIsLoading(false);
      return;
    }

    try {
      // Cache if remember me
      if (rememberMe) {
        localStorage.setItem('cachedLogin', JSON.stringify({
          schoolId: formData.schoolId,
          email: formData.email,
          remember: true
        }));
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('admin_token', 'token');
      localStorage.setItem('school_id', formData.schoolId);
      localStorage.setItem('school_name', 'Demo School');
      
      window.location.href = '/admin/dashboard';
      
    } catch (error) {
      setErrors({ submit: 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Header - Compact */}
        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <div>
            <h1 style={styles.title}>TrendWave Connect</h1>
            <p style={styles.subtitle}>Admin Portal</p>
          </div>
        </div>

        {/* Login Form - Compact */}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="School ID"
            value={formData.schoolId}
            onChange={(e) => setFormData({...formData, schoolId: e.target.value})}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={styles.input}
          />

          {/* Compact Captcha */}
          <div style={styles.captchaBox}>
            <div style={styles.captchaHeader}>
              <span>Security: {captcha.question} = ?</span>
              <button 
                type="button" 
                onClick={generateCaptcha}
                style={styles.refreshBtn}
              >
                🔄
              </button>
            </div>
            <input
              type="number"
              placeholder="Answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={styles.captchaInput}
            />
            {errors.captcha && <span style={styles.error}>⚠️ {errors.captcha}</span>}
          </div>

          {/* Remember Me - Compact */}
          <label style={styles.remember}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={styles.checkbox}
            />
            Remember me
          </label>

          {/* Submit Button - Compact */}
          <button 
            type="submit" 
            disabled={isLoading}
            style={styles.loginBtn}
          >
            {isLoading ? '🔐 Signing in...' : '🚀 Sign In'}
          </button>

          {errors.submit && <span style={styles.error}>❌ {errors.submit}</span>}
        </form>

        {/* Visitor Section - Compact */}
        <div style={styles.visitorBox}>
          <span style={styles.visitorText}>New school?</span>
          <button style={styles.visitorBtn}>
            Visit trendwaveconnect.com
          </button>
        </div>

        {/* Support - Compact */}
        <div style={styles.supportBox}>
          <span style={styles.supportText}>Login issues?</span>
          <div style={styles.supportLinks}>
            <a href="mailto:support@trendwaveconnect.com">📧 Support</a>
            <a href="tel:+254700000000">📞 Call</a>
          </div>
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
    padding: '15px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
  },
  loginCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '350px',
    maxHeight: '95vh',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    textAlign: 'left'
  },
  logo: {
    fontSize: '28px',
    background: '#1E3A8A',
    color: 'white',
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1E3A8A',
    margin: '0 0 2px 0'
  },
  subtitle: {
    fontSize: '12px',
    color: '#6B7280',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  input: {
    padding: '10px 12px',
    border: '1.5px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box'
  },
  captchaBox: {
    background: '#F8FAFC',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB'
  },
  captchaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151'
  },
  refreshBtn: {
    background: 'none',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '4px'
  },
  captchaInput: {
    padding: '8px 10px',
    border: '1.5px solid #E5E7EB',
    borderRadius: '6px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box'
  },
  remember: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#374151',
    cursor: 'pointer'
  },
  checkbox: {
    margin: 0,
    transform: 'scale(0.9)'
  },
  loginBtn: {
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '5px'
  },
  error: {
    color: '#EF4444',
    fontSize: '11px',
    textAlign: 'center',
    display: 'block'
  },
  visitorBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderTop: '1px solid #E5E7EB',
    borderBottom: '1px solid #E5E7EB',
    marginBottom: '15px'
  },
  visitorText: {
    fontSize: '12px',
    color: '#6B7280'
  },
  visitorBtn: {
    background: 'none',
    border: '1px solid #1E3A8A',
    color: '#1E3A8A',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    cursor: 'pointer'
  },
  supportBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  supportText: {
    fontSize: '11px',
    color: '#6B7280'
  },
  supportLinks: {
    display: 'flex',
    gap: '10px'
  },
  supportLinks: {
    display: 'flex',
    gap: '10px'
  }
};

// Add CSS for links
const linkStyle = {
  fontSize: '11px',
  color: '#1E3A8A',
  textDecoration: 'none'
};
