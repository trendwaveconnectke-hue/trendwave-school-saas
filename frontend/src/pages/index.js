import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ModernHome() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  const navigateToOption = () => {
    router.push('/auth/option');
  };

  const navigateToWebsite = () => {
    window.open('https://trendwaveconnect.com', '_blank');
  };

  const features = [
    { 
      icon: '👥', 
      title: 'Member Management', 
      desc: 'Complete member records, profiles, and relationship tracking across all organization types' 
    },
    { 
      icon: '💰', 
      title: 'Financial Management', 
      desc: 'Multi-currency billing, payment tracking, and financial reporting for global operations' 
    },
    { 
      icon: '📊', 
      title: 'Advanced Analytics', 
      desc: 'Real-time insights and performance metrics tailored to your organization type' 
    },
    { 
      icon: '🌍', 
      title: 'Global Infrastructure', 
      desc: 'Multi-language, multi-timezone support with local compliance for 190+ countries' 
    },
    { 
      icon: '🔒', 
      title: 'Enterprise Security', 
      desc: 'Bank-grade security, GDPR compliance, and military-level data protection' 
    },
    { 
      icon: '🔄', 
      title: 'Workflow Automation', 
      desc: 'Customizable workflows for admissions, HR, operations, and member services' 
    }
  ];

  const organizationTypes = [
    { icon: '🎓', name: 'Educational Institutions', count: '500+' },
    { icon: '🏢', name: 'Business Corporations', count: '200+' },
    { icon: '🏛️', name: 'Government Agencies', count: '75+' },
    { icon: '🏥', name: 'Healthcare Organizations', count: '150+' },
    { icon: '🤝', name: 'Non-Profit Organizations', count: '300+' },
    { icon: '🏭', name: 'Industrial Companies', count: '120+' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      
      <div style={{
        ...styles.content,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}>
        
        <header style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🌐</span>
            <span style={styles.logoText}>TrendWave Connect</span>
          </div>
          <div style={styles.headerButtons}>
            <button 
              onClick={navigateToWebsite} 
              style={styles.secondaryButton}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              Website
            </button>
            <button 
              onClick={navigateToLogin} 
              style={styles.primaryButton}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              Admin Login
            </button>
          </div>
        </header>

        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              One Platform for
              <span style={styles.highlight}> Every Organization</span>
            </h1>
            <p style={styles.heroSubtitle}>
              The world's most comprehensive management platform for schools, businesses, 
              governments, and organizations of all types.
            </p>
            
            <div style={styles.heroButtons}>
              <button 
                onClick={navigateToOption} 
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
                }}
              >
                Start Free Trial
              </button>
              <button 
                onClick={navigateToLogin} 
                style={styles.outlineButton}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Admin Portal
              </button>
            </div>

            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>1,200+</span>
                <span style={styles.statLabel}>Organizations</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>85+</span>
                <span style={styles.statLabel}>Countries</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>99.9%</span>
                <span style={styles.statLabel}>Uptime</span>
              </div>
            </div>
          </div>
          
          <div style={styles.illustration}>
            <div style={styles.floatingElement}>🏢</div>
            <div style={{...styles.floatingElement, animationDelay: '1s'}}>🎓</div>
            <div style={{...styles.floatingElement, animationDelay: '2s'}}>🏛️</div>
          </div>
        </section>

        <section style={styles.organizations}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Trusted Worldwide</h2>
            <p style={styles.sectionSubtitle}>
              Serving diverse organizations across every sector and continent
            </p>
          </div>
          
          <div style={styles.orgGrid}>
            {organizationTypes.map((org, index) => (
              <div 
                key={index}
                style={styles.orgCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={styles.orgIcon}>{org.icon}</div>
                <h3 style={styles.orgName}>{org.name}</h3>
                <span style={styles.orgCount}>{org.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.features}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Enterprise-Grade Features</h2>
            <p style={styles.sectionSubtitle}>
              Comprehensive tools designed for organizations of all types and sizes
            </p>
          </div>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.global}>
          <div style={styles.globalContent}>
            <div style={styles.globalText}>
              <h2 style={styles.globalTitle}>Truly Global Infrastructure</h2>
              <p style={styles.globalDesc}>
                With data centers across 6 continents and support for 190+ countries, 
                we ensure optimal performance and compliance wherever your organization operates.
              </p>
              <div style={styles.globalStats}>
                <div style={styles.globalStat}>
                  <strong style={styles.globalStatNumber}>6</strong>
                  <span style={styles.globalStatLabel}>Continents</span>
                </div>
                <div style={styles.globalStat}>
                  <strong style={styles.globalStatNumber}>190+</strong>
                  <span style={styles.globalStatLabel}>Countries</span>
                </div>
                <div style={styles.globalStat}>
                  <strong style={styles.globalStatNumber}>50+</strong>
                  <span style={styles.globalStatLabel}>Languages</span>
                </div>
                <div style={styles.globalStat}>
                  <strong style={styles.globalStatNumber}>24/7</strong>
                  <span style={styles.globalStatLabel}>Support</span>
                </div>
              </div>
            </div>
            <div style={styles.globalMap}>
              <div style={styles.mapPlaceholder}>🌍</div>
            </div>
          </div>
        </section>

        <section style={styles.ctaSection}>
          <div style={styles.ctaCard}>
            <h2 style={styles.ctaTitle}>Ready to Transform Your Organization?</h2>
            <p style={styles.ctaText}>
              Join thousands of organizations worldwide using TrendWave Connect.
            </p>
            <div style={styles.ctaButtons}>
              <button 
                onClick={navigateToOption} 
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
                }}
              >
                Start Your Free Trial
              </button>
              <button 
                onClick={navigateToWebsite} 
                style={styles.contactButton}
                onMouseEnter={(e) => {
                  e.target.style.background = '#1e3a8a';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#1e3a8a';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerBrand}>
              <div style={styles.logo}>
                <span style={styles.logoIcon}>🌐</span>
                <span style={styles.logoText}>TrendWave Connect</span>
              </div>
              <p style={styles.footerText}>
                Empowering organizations worldwide through innovative technology
              </p>
            </div>
            
            <div style={styles.footerLinks}>
              <div style={styles.linkGroup}>
                <strong style={styles.linkTitle}>Platform</strong>
                <a href="/auth/login" style={styles.footerLink}>Admin Login</a>
                <a href="/auth/register" style={styles.footerLink}>Register</a>
                <a href="https://trendwaveconnect.com/features" style={styles.footerLink}>Features</a>
              </div>
              
              <div style={styles.linkGroup}>
                <strong style={styles.linkTitle}>Support</strong>
                <a href="mailto:support@trendwaveconnect.com" style={styles.footerLink}>
                  support@trendwaveconnect.com
                </a>
                <a href="mailto:sales@trendwaveconnect.com" style={styles.footerLink}>
                  sales@trendwaveconnect.com
                </a>
                <a href="mailto:contact@trendwaveconnect.com" style={styles.footerLink}>
                  contact@trendwaveconnect.com
                </a>
              </div>
              
              <div style={styles.linkGroup}>
                <strong style={styles.linkTitle}>Company</strong>
                <a href="https://trendwaveconnect.com" style={styles.footerLink}>Website</a>
                <a href="https://trendwaveconnect.com/about" style={styles.footerLink}>About Us</a>
                <a href="https://trendwaveconnect.com/contact" style={styles.footerLink}>Contact</a>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p style={styles.copyright}>
              © 2024-2026 TrendWave Connect. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    transition: 'all 0.8s ease-out'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'white'
  },
  logoIcon: {
    fontSize: '1.3rem'
  },
  logoText: {
    background: 'linear-gradient(45deg, #fff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  headerButtons: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  primaryButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  },
  secondaryButton: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    padding: '2rem 2rem 4rem',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '2rem'
  },
  heroContent: {
    color: 'white'
  },
  heroTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    lineHeight: '1.2',
    margin: '0 0 0.8rem 0',
    background: 'linear-gradient(45deg, #fff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  highlight: {
    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'block'
  },
  heroSubtitle: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    margin: '0 0 1.5rem 0',
    opacity: '0.9',
    maxWidth: '400px'
  },
  heroButtons: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  ctaButton: {
    background: 'linear-gradient(45deg, #f59e0b, #d97706)',
    border: 'none',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
  },
  outlineButton: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  stats: {
    display: 'flex',
    gap: '1.5rem'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  statNumber: {
    fontSize: '1.2rem',
    fontWeight: '800',
    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  statLabel: {
    fontSize: '0.7rem',
    opacity: '0.8'
  },
  illustration: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px'
  },
  floatingElement: {
    position: 'absolute',
    fontSize: '2.5rem',
    animation: 'float 3s ease-in-out infinite',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '0.6rem',
    backdropFilter: 'blur(10px)'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    margin: '0 0 0.5rem 0',
    color: '#1f2937'
  },
  sectionSubtitle: {
    fontSize: '0.8rem',
    color: '#6b7280',
    margin: 0,
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  organizations: {
    background: 'white',
    padding: '3rem 2rem'
  },
  orgGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  orgCard: {
    background: 'white',
    padding: '1.2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #f3f4f6',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  orgIcon: {
    fontSize: '1.8rem',
    marginBottom: '0.6rem'
  },
  orgName: {
    fontSize: '0.8rem',
    fontWeight: '600',
    margin: '0 0 0.4rem 0',
    color: '#1f2937'
  },
  orgCount: {
    fontSize: '0.7rem',
    color: '#f59e0b',
    fontWeight: '700'
  },
  features: {
    background: '#f8fafc',
    padding: '3rem 2rem'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.2rem',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  featureCard: {
    background: 'white',
    padding: '1.2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #f3f4f6',
    transition: 'all 0.3s ease'
  },
  featureIcon: {
    fontSize: '1.8rem',
    marginBottom: '0.8rem'
  },
  featureTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    margin: '0 0 0.4rem 0',
    color: '#1f2937'
  },
  featureDesc: {
    fontSize: '0.75rem',
    color: '#6b7280',
    lineHeight: '1.4',
    margin: 0
  },
  global: {
    background: 'white',
    padding: '3rem 2rem'
  },
  globalContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    alignItems: 'center',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  globalTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    margin: '0 0 0.8rem 0',
    color: '#1f2937'
  },
  globalDesc: {
    fontSize: '0.8rem',
    color: '#6b7280',
    lineHeight: '1.5',
    margin: '0 0 1.5rem 0'
  },
  globalStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem'
  },
  globalStat: {
    textAlign: 'center',
    padding: '0.8rem',
    background: '#f8fafc',
    borderRadius: '8px'
  },
  globalStatNumber: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: '0.2rem'
  },
  globalStatLabel: {
    fontSize: '0.7rem',
    color: '#6b7280'
  },
  mapPlaceholder: {
    fontSize: '6rem',
    textAlign: 'center',
    opacity: '0.7'
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #1e3a8a, #3730a3)',
    padding: '3rem 2rem'
  },
  ctaCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
  },
  ctaTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    margin: '0 0 0.8rem 0',
    color: '#1f2937'
  },
  ctaText: {
    fontSize: '0.8rem',
    color: '#6b7280',
    margin: '0 0 1.5rem 0',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  ctaButtons: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  contactButton: {
    background: 'transparent',
    border: '1px solid #1e3a8a',
    color: '#1e3a8a',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  footer: {
    background: '#1f2937',
    color: 'white',
    padding: '2rem 2rem 1rem'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    marginBottom: '1.5rem'
  },
  footerBrand: {
    maxWidth: '200px'
  },
  footerText: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    lineHeight: '1.4',
    margin: '0.5rem 0 0 0'
  },
  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem'
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  linkTitle: {
    fontSize: '0.8rem',
    marginBottom: '0.6rem',
    color: 'white'
  },
  footerLink: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  footerBottom: {
    borderTop: '1px solid #374151',
    paddingTop: '1rem',
    textAlign: 'center'
  },
  copyright: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    margin: 0
  }
};
