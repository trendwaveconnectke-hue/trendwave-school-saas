import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function WorkingLogin() {
  const [formData, setFormData] = useState({
    schoolId: '',
    email: '',
    password: ''
  });
  const [captcha, setCaptcha] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    generateCaptcha();
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
    setErrors({});

    // Validate captcha
    if (parseInt(userAnswer) !== captcha.answer) {
      setErrors({ captcha: 'Wrong security answer' });
      generateCaptcha();
      setIsLoading(false);
      return;
    }

    try {
      // REAL API CALL to your backend
      const response = await fetch('https://trendwave-backend-zord.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          school_id: formData.schoolId,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store authentication data
        localStorage.setItem('admin_token', data.data.token);
        localStorage.setItem('school_id', data.data.school.id);
        localStorage.setItem('school_name', data.data.school.name);
        
        // Redirect to dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setErrors({ submit: data.message || 'Login failed' });
        generateCaptcha();
      }
      
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection.' });
      generateCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <div>
            <h1 style={styles.title}>TrendWave Connect</h1>
            <p style={styles.subtitle}>Secure Admin Portal</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="School ID (TWC0001)"
            value={formData.schoolId}
            onChange={(e) => setFormData({...formData, schoolId: e.target.value})}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={styles.input}
            required
          />

          {/* Security Check */}
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
              placeholder="Your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={styles.captchaInput}
              required
            />
            {errors.captcha && <span style={styles.error}>⚠️ {errors.captcha}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              ...styles.loginBtn,
              ...(isLoading && styles.loadingBtn)
            }}
          >
            {isLoading ? '🔐 Verifying...' : '🚀 Sign In'}
          </button>

          {errors.submit && <span style={styles.error}>❌ {errors.submit}</span>}
        </form>

        {/* Demo Info */}
        <div style={styles.note}>
          <p style={styles.noteText}>
            <strong>Demo:</strong> Use TWC0001 / trendwaveconnectke@gmail.com / @Dan0718#
          </p>
        </div>

        {/* Support */}
        <div style={styles.support}>
          <span style={styles.supportText}>Need help?</span>
          <a href="mailto:support@trendwaveconnect.com" style={styles.supportLink}>
            Contact Support
          </a>
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
    maxWidth: '350px'
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
    marginBottom: '15px'
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
  loadingBtn: {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
  error: {
    color: '#EF4444',
    fontSize: '11px',
    textAlign: 'center',
    display: 'block'
  },
  note: {
    background: '#F0F9FF',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
    border: '1px solid #E0F2FE'
  },
  noteText: {
    fontSize: '11px',
    color: '#0369A1',
    margin: 0,
    textAlign: 'center'
  },
  support: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#6B7280'
  },
  supportLink: {
    color: '#1E3A8A',
    textDecoration: 'none',
    fontSize: '11px'
  }
};
