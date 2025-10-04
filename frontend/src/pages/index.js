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

  const navigateToWebsite = () => {
    window.open('https://trendwaveconnect.com', '_blank');
  };

  const features = [
    { icon: '🎓', title: 'Student Management', desc: 'Complete student records and progress tracking' },
    { icon: '👨‍🏫', title: 'Teacher Portal', desc: 'Lesson planning and grade management' },
    { icon: '💰', title: 'Fee Management', desc: 'Automated billing and payment tracking' },
    { icon: '📱', title: 'Mobile Apps', desc: 'Dedicated apps for students, parents, teachers' },
    { icon: '🌍', title: 'Global Ready', desc: 'Multi-currency and multi-language support' },
    { icon: '🔒', title: 'Bank-Grade Security', desc: 'KCB-level security and data protection' }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.background}></div>
      
      {/* Main Content */}
      <div style={{
        ...styles.content,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}>
        
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🎓</span>
            <span style={styles.logoText}>TrendWave Connect</span>
          </div>
          <div style={styles.headerButtons}>
            <button onClick={navigateToWebsite} style={styles.secondaryButton}>
              🌐 Visit Our Website
            </button>
            <button onClick={navigateToLogin} style={styles.primaryButton}>
              🔐 Admin Login
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Transform Your School with
              <span style={styles.highlight}> Digital Excellence</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Africa's most comprehensive school management platform. 
              Streamline administration, enhance learning, and engage your community.
            </p>
            
            {/* Action Buttons */}
            <div style={styles.heroButtons}>
              <button onClick={navigateToLogin} style={styles.ctaButton}>
                🚀 Launch Admin Portal
              </button>
              <button onClick={navigateToWebsite} style={styles.outlineButton}>
                💼 View Pricing & Plans
              </button>
            </div>

            {/* Stats */}
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>100+</span>
                <span style={styles.statLabel}>Schools</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>50,000+</span>
                <span style={styles.statLabel}>Students</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>15+</span>
                <span style={styles.statLabel}>Countries</span>
              </div>
            </div>
          </div>
          
          {/* Animated Illustration */}
          <div style={styles.illustration}>
            <div style={styles.floatingElement}>📚</div>
            <div style={{...styles.floatingElement, animationDelay: '1s'}}>👥</div>
            <div style={{...styles.floatingElement, animationDelay: '2s'}}>💰</div>
          </div>
        </section>

        {/* Features Grid */}
        <section style={styles.features}>
          <h2 style={styles.sectionTitle}>Everything Your School Needs</h2>
          <p style={styles.sectionSubtitle}>
            Comprehensive tools designed for African educational institutions
          </p>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  ...styles.featureCard,
                  animationDelay: `${index * 0.1}s`
                }}
                className="feature-card"
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaCard}>
            <h2 style={styles.ctaTitle}>Ready to Transform Your School?</h2>
            <p style={styles.ctaText}>
              Join hundreds of schools already using TrendWave Connect to streamline their operations.
            </p>
            <div style={styles.ctaButtons}>
              <button onClick={navigateToLogin} style={styles.ctaButton}>
                🎯 Start Managing Your School
              </button>
              <button onClick={navigateToWebsite} style={styles.contactButton}>
                📞 Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerBrand}>
              <div style={styles.logo}>
                <span style={styles.logoIcon}>🎓</span>
                <span style={styles.logoText}>TrendWave Connect</span>
              </div>
              <p style={styles.footerText}>
                Empowering African education through technology
              </p>
            </div>
            
            <div style={styles.footerLinks}>
              <div style={styles.linkGroup}>
                <strong style={styles.linkTitle}>Platform</strong>
                <a href="/auth/login" style={styles.footerLink}>Admin Login</a>
                <a href="https://trendwaveconnect.com/features" style={styles.footerLink}>Features</a>
                <a href="https://trendwaveconnect.com/pricing" style={styles.footerLink}>Pricing</a>
              </div>
              
              <div style={styles.linkGroup}>
                <strong style={styles.linkTitle}>Support</strong>
                <a href="mailto:support@trendwaveconnect.com" style={styles.footerLink}>
                  📧 support@trendwaveconnect.com
                </a>
                <a href="mailto:contact@trendwaveconnect.com" style={styles.footerLink}>
                  📞 contact@trendwaveconnect.com
                </a>
                <a href="https://trendwaveconnect.com/help" style={styles.footerLink}>Help Center</a>
              </div>
              
              <div style={styles.linkGroup}>
                <strong style={styles.linkTitle}>Company</strong>
                <a href="https://trendwaveconnect.com/about" style={styles.footerLink}>About Us</a>
                <a href="https://trendwaveconnect.com/blog" style={styles.footerLink}>Blog</a>
                <a href="https://trendwaveconnect.com/contact" style={styles.footerLink}>Contact</a>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p style={styles.copyright}>
              © 2026 TrendWave Connect. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
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
        
        .feature-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
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
    overflow: 'hidden'
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
    padding: '2rem 4rem',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white'
  },
  logoIcon: {
    fontSize: '2rem'
  },
  logoText: {
    background: 'linear-gradient(45deg, #fff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  headerButtons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  primaryButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  secondaryButton: {
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    padding: '4rem 4rem 8rem',
    maxWidth: '1400px',
    margin: '0 auto',
    gap: '4rem'
  },
  heroContent: {
    color: 'white'
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    lineHeight: '1.1',
    margin: '0 0 1.5rem 0',
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
    fontSize: '1.25rem',
    lineHeight: '1.6',
    margin: '0 0 2.5rem 0',
    opacity: '0.9',
    maxWidth: '500px'
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    flexWrap: 'wrap'
  },
  ctaButton: {
    background: 'linear-gradient(45deg, #f59e0b, #d97706)',
    border: 'none',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)'
  },
  outlineButton: {
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  stats: {
    display: 'flex',
    gap: '3rem'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: '0.8'
  },
  illustration: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px'
  },
  floatingElement: {
    position: 'absolute',
    fontSize: '4rem',
    animation: 'float 3s ease-in-out infinite',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '1rem',
    backdropFilter: 'blur(10px)'
  },
  features: {
    background: 'white',
    padding: '6rem 4rem',
    borderRadius: '40px 40px 0 0'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    textAlign: 'center',
    margin: '0 0 1rem 0',
    color: '#1f2937'
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#6b7280',
    margin: '0 0 4rem 0',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    border: '1px solid #f3f4f6',
    transition: 'all 0.3s ease',
    opacity: 0
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    color: '#1f2937'
  },
  featureDesc: {
    color: '#6b7280',
    lineHeight: '1.6',
    margin: 0
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #1e3a8a, #3730a3)',
    padding: '6rem 4rem'
  },
  ctaCard: {
    background: 'white',
    padding: '4rem',
    borderRadius: '30px',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '0 0 1rem 0',
    color: '#1f2937'
  },
  ctaText: {
    fontSize: '1.2rem',
    color: '#6b7280',
    margin: '0 0 2.5rem 0',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  contactButton: {
    background: 'transparent',
    border: '2px solid #1e3a8a',
    color: '#1e3a8a',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  footer: {
    background: '#1f2937',
    color: 'white',
    padding: '4rem 4rem 2rem'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '4rem',
    maxWidth: '1400px',
    margin: '0 auto',
    marginBottom: '3rem'
  },
  footerBrand: {
    maxWidth: '300px'
  },
  footerText: {
    color: '#9ca3af',
    lineHeight: '1.6',
    margin: '1rem 0 0 0'
  },
  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3rem'
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  linkTitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: 'white'
  },
  footerLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  footerBottom: {
    borderTop: '1px solid #374151',
    paddingTop: '2rem',
    textAlign: 'center'
  },
  copyright: {
    color: '#9ca3af',
    margin: 0
  }
};

// Add hover effects
Object.assign(styles.primaryButton, {
  ':hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-2px)'
  }
});

Object.assign(styles.secondaryButton, {
  ':hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)'
  }
});

Object.assign(styles.ctaButton, {
  ':hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 40px rgba(245, 158, 11, 0.6)'
  }
});

Object.assign(styles.outlineButton, {
  ':hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)'
  }
});

Object.assign(styles.contactButton, {
  ':hover': {
    background: '#1e3a8a',
    color: 'white',
    transform: 'translateY(-2px)'
  }
});

Object.assign(styles.featureCard, {
  ':hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
  }
});

Object.assign(styles.footerLink, {
  ':hover': {
    color: 'white'
  }
});
