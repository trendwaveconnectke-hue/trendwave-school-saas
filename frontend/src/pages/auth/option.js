import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function OrganizationOption() {
  const router = useRouter();
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const organizationTypes = [
    {
      id: 'education',
      icon: '🎓',
      title: 'Schools & Education',
      description: 'Universities, Colleges, Schools, Training Centers',
      color: '#4F46E5',
      idPrefix: 'TWCS'
    },
    {
      id: 'business',
      icon: '🏢', 
      title: 'Companies & Business',
      description: 'Corporations, Startups, SMEs, Enterprises',
      color: '#059669',
      idPrefix: 'TWCI'
    },
    {
      id: 'healthcare',
      icon: '🏥',
      title: 'Healthcare & Medical', 
      description: 'Hospitals, Clinics, Medical Centers, Pharmacies',
      color: '#DC2626',
      idPrefix: 'TWCH'
    },
    {
      id: 'government',
      icon: '🏛️',
      title: 'Government & Public',
      description: 'Ministries, Agencies, Public Institutions',
      color: '#7C3AED',
      idPrefix: 'TWCG'
    },
    {
      id: 'nonprofit',
      icon: '🤝',
      title: 'Non-Profit & NGO',
      description: 'Charities, Foundations, Community Organizations',
      color: '#EA580C',
      idPrefix: 'TWCN'
    },
    {
      id: 'religious',
      icon: '⛪',
      title: 'Religious & Faith',
      description: 'Churches, Mosques, Temples, Religious Centers',
      color: '#0EA5E9',
      idPrefix: 'TWCC'
    },
    {
      id: 'industrial',
      icon: '🏭',
      title: 'Industrial & Manufacturing',
      description: 'Factories, Production Plants, Industrial Complexes',
      color: '#475569',
      idPrefix: 'TWCI'
    },
    {
      id: 'association',
      icon: '👥',
      title: 'Associations & Clubs',
      description: 'Professional Bodies, Unions, Societies, Clubs',
      color: '#DB2777',
      idPrefix: 'TWCA'
    }
  ];

  const handleOrganizationSelect = async (orgType) => {
    setSelectedOrg(orgType.id);
    setIsLoading(true);
    
    // Add a smooth loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Navigate to registration with the selected type
    router.push(`/auth/register-new?type=${orgType.id}`);
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={styles.floatingShape1}></div>
        <div style={styles.floatingShape2}></div>
        <div style={styles.floatingShape3}></div>
      </div>
      
      <div style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>🌐</div>
            <div style={styles.logoText}>
              <span style={styles.logoMain}>TrendWave</span>
              <span style={styles.logoSub}>Connect</span>
            </div>
          </div>
          <h1 style={styles.title}>Choose Your Organization Type</h1>
          <p style={styles.subtitle}>
            Select the category that best describes your organization to begin registration
          </p>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>
              Preparing {organizationTypes.find(org => org.id === selectedOrg)?.title} registration...
            </p>
          </div>
        )}

        {/* Organization Grid */}
        <div style={styles.orgGrid}>
          {organizationTypes.map((orgType, index) => (
            <div
              key={orgType.id}
              style={{
                ...styles.orgCard,
                animationDelay: `${index * 0.1}s`,
                borderColor: selectedOrg === orgType.id ? orgType.color : '#E5E7EB',
                transform: selectedOrg === orgType.id ? 'scale(1.05)' : 'scale(1)'
              }}
              onClick={() => !isLoading && handleOrganizationSelect(orgType)}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-8px) scale(1.02)';
                  e.target.style.boxShadow = `0 20px 40px ${orgType.color}20`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = selectedOrg === orgType.id ? 
                    'scale(1.05)' : 'translateY(0) scale(1)';
                  e.target.style.boxShadow = selectedOrg === orgType.id ?
                    `0 15px 35px ${orgType.color}30` : '0 4px 20px rgba(0,0,0,0.08)';
                }
              }}
            >
              {/* Icon with pulse animation when selected */}
              <div 
                style={{
                  ...styles.orgIcon,
                  background: `linear-gradient(135deg, ${orgType.color}, ${orgType.color}dd)`,
                  animation: selectedOrg === orgType.id ? 'pulse 2s infinite' : 'none'
                }}
              >
                {orgType.icon}
              </div>
              
              <div style={styles.orgContent}>
                <h3 style={styles.orgTitle}>{orgType.title}</h3>
                <p style={styles.orgDescription}>{orgType.description}</p>
                
                <div style={styles.orgId}>
                  <span style={styles.idLabel}>Organization ID:</span>
                  <span style={{...styles.idValue, color: orgType.color}}>
                    {orgType.idPrefix}####
                  </span>
                </div>
              </div>

              {/* Selection Indicator */}
              <div 
                style={{
                  ...styles.selectionIndicator,
                  background: orgType.color,
                  opacity: selectedOrg === orgType.id ? 1 : 0
                }}
              >
                ✓
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Not sure which category fits? <span style={styles.helpText}>Contact our support team</span>
          </p>
          <button 
            onClick={() => router.push('/')}
            style={styles.backButton}
            disabled={isLoading}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(79, 70, 229, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .org-card {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  floatingShape1: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '100px',
    height: '100px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },
  floatingShape2: {
    position: 'absolute',
    top: '60%',
    right: '10%',
    width: '150px',
    height: '150px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '30%',
    animation: 'float 8s ease-in-out infinite 2s'
  },
  floatingShape3: {
    position: 'absolute',
    bottom: '20%',
    left: '15%',
    width: '80px',
    height: '80px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '40%',
    animation: 'float 7s ease-in-out infinite 1s'
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '1200px',
    padding: '50px 40px',
    position: 'relative',
    zIndex: 2
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '25px'
  },
  logo: {
    fontSize: '48px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  logoMain: {
    fontSize: '24px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  logoSub: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: '1px'
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#1E3A8A',
    margin: '0 0 15px 0',
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    margin: 0,
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.6'
  },
  orgGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    marginBottom: '40px'
  },
  orgCard: {
    background: 'white',
    border: '2px solid #E5E7EB',
    borderRadius: '20px',
    padding: '30px 25px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeInUp 0.6s ease-out both',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  orgIcon: {
    width: '70px',
    height: '70px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    marginBottom: '20px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease'
  },
  orgContent: {
    flex: 1
  },
  orgTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#1F2937',
    margin: '0 0 10px 0',
    lineHeight: '1.3'
  },
  orgDescription: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 20px 0',
    lineHeight: '1.5'
  },
  orgId: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 15px',
    background: '#F8FAFC',
    borderRadius: '12px',
    border: '1px solid #E5E7EB'
  },
  idLabel: {
    fontSize: '12px',
    color: '#6B7280',
    fontWeight: '600'
  },
  idValue: {
    fontSize: '14px',
    fontWeight: '800',
    letterSpacing: '0.5px'
  },
  selectionIndicator: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255,255,255,0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '24px',
    zIndex: 10
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  loadingText: {
    fontSize: '16px',
    color: '#6B7280',
    fontWeight: '600',
    margin: 0
  },
  footer: {
    textAlign: 'center',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '30px'
  },
  footerText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 20px 0'
  },
  helpText: {
    color: '#667eea',
    fontWeight: '600',
    cursor: 'pointer'
  },
  backButton: {
    background: 'none',
    border: '1px solid #D1D5DB',
    color: '#6B7280',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};
