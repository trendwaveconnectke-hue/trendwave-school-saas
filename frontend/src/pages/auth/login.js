import React from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <h1 style={styles.title}>School Registration</h1>
          <p style={styles.subtitle}>Create your school account in minutes</p>
        </div>
        
        <div style={styles.content}>
          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>🚀</span>
              <div>
                <h3>1 Month Free Trial</h3>
                <p>Full access to all features with no commitment</p>
              </div>
            </div>
            
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>👥</span>
              <div>
                <h3>Student Management</h3>
                <p>Complete student records and parent communication</p>
              </div>
            </div>
            
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>💰</span>
              <div>
                <h3>Fee Collection</h3>
                <p>Mobile money integration and payment tracking</p>
              </div>
            </div>
          </div>
          
          <button 
            style={styles.primaryButton}
            onClick={() => router.push('/auth/register-new')}
          >
            🎯 Start School Registration
          </button>
          
          <button 
            style={styles.secondaryButton}
            onClick={() => router.push('/auth/login')}
          >
            Already have an account? Sign In
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
    maxWidth: '500px',
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    textAlign: 'left',
    padding: '20px',
    background: '#F8FAFC',
    borderRadius: '12px',
    border: '1px solid #E5E7EB'
  },
  featureIcon: {
    fontSize: '24px',
    marginTop: '2px'
  },
  featureItem h3: {
    margin: '0 0 5px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1F2937'
  },
  featureItem p: {
    margin: 0,
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: '1.5'
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    color: 'white',
    border: 'none',
    padding: '18px 30px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 30px rgba(30, 58, 138, 0.4)'
    }
  },
  secondaryButton: {
    background: 'none',
    color: '#6B7280',
    border: '2px solid #E5E7EB',
    padding: '15px 30px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#1E3A8A',
      color: '#1E3A8A'
    }
  }
};
