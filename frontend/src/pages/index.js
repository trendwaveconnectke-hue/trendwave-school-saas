// ... existing imports and code above remains the same ...

const navigateToOption = () => {
  router.push('/auth/option');
};

// ... existing features and organizationTypes arrays remain the same ...

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
              onClick={navigateToOption}  // Changed from navigateToRegister to navigateToOption
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

      {/* ... rest of the existing sections remain exactly the same ... */}

      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Organization?</h2>
          <p style={styles.ctaText}>
            Join thousands of organizations worldwide using TrendWave Connect.
          </p>
          <div style={styles.ctaButtons}>
            <button 
              onClick={navigateToOption}  // Changed from navigateToRegister to navigateToOption
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

      {/* ... footer remains exactly the same ... */}
    </div>

    <style jsx global>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `}</style>
  </div>
);

// ... all the existing styles object remains exactly the same ...
