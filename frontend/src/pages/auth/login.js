import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Connect to real backend
      console.log('Logging in:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to admin dashboard (we'll create this next)
      router.push('/admin/dashboard');
      
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed - please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Connect to real password reset API
      console.log('Reset password for:', email);
      alert('Password reset link sent to your email!');
      setShowReset(false);
    } catch (error) {
      console.error('Reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#1E3A8A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px'
          }}>
            <span style={{ color: 'white', fontSize: '24px' }}>🎓</span>
          </div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1F2937',
            margin: '0 0 5px 0'
          }}>
            TrendWave Connect
          </h1>
          <p style={{ 
            color: '#6B7280', 
            margin: 0,
            fontSize: '14px'
          }}>
            School Administration Portal
          </p>
        </div>

        {!showReset ? (
          /* LOGIN FORM */
          <form onSubmit={handleLogin} style={{ spaceY: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                School Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="your-school@example.com"
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: '#1E3A8A',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In to Admin Portal'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setShowReset(true)}
                style={{
                  color: '#1E3A8A',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Forgot your password?
              </button>
            </div>
          </form>
        ) : (
          /* RESET PASSWORD FORM */
          <form onSubmit={handleResetPassword} style={{ spaceY: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Enter your school email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="your-school@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: '#1E3A8A',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setShowReset(false)}
                style={{
                  color: '#1E3A8A',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Back to login
              </button>
            </div>
          </form>
        )}

        {/* Demo Info */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#FEF3C7',
          borderRadius: '8px',
          border: '1px solid #F59E0B'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#92400E',
            textAlign: 'center',
            margin: 0
          }}>
            <strong>Demo Mode:</strong> Currently using simulated login. 
            Will connect to real backend in next steps.
          </p>
        </div>
      </div>
    </div>
  );
}
