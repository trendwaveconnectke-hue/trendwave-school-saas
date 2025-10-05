import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  const navigateToRegister = () => {
    router.push('/auth/register');
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🌐</div>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Access your organization's management portal</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yourorganization.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formOptions}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} />
              <span style={styles.checkboxText}>Remember me</span>
            </label>
            <a href="/auth/forgot-password" style={styles.forgotLink}>
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            style={styles.primaryButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
            }}
          >
            Sign In
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{' '}
            <button 
              onClick={navigateToRegister} 
              style={styles.linkButton}
              onMouseEnter={(e) => {
                e.target.style.color = '#1E3A8A';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#667eea';
              }}
            >
              Register your organization
            </button>
          </p>
          <button 
            onClick={navigateToHome} 
            style={styles.secondaryButton}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#1E3A8A';
              e.target.style.color = '#1E3A8A';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.color = '#6B7280';
            }}
          >
            Back to Home
          </button>
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
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center'
  },
  header: {
    marginBottom: '30px'
  },
  logo: {
    fontSize: '48px',
    marginBottom: '15px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1E3A8A',
    margin: '0 0 10px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    margin: 0
  },
  form: {
    marginBottom: '30px'
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left'
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
  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    fontSize: '14px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#6B7280',
    cursor: 'pointer'
  },
  checkbox: {
    margin: 0
  },
  checkboxText: {
    fontSize: '14px'
  },
  forgotLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px'
  },
  primaryButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
  },
  secondaryButton: {
    width: '100%',
    background: 'none',
    color: '#6B7280',
    border: '2px solid #E5E7EB',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '15px'
  },
  footer: {
    textAlign: 'center'
  },
  footerText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 20px 0'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    transition: 'all 0.3s ease',
    padding: 0
  }
};
