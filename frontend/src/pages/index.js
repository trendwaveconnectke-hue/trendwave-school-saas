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

  const navigateToRegister = () => {
    router.push('/auth/register');
  };

  const navigateToWebsite = () => {
    window.open('https://trendwaveconnect.com', '_blank');
  };

  const features = [
    { 
      icon: '👥', 
      title: 'Member Management', 
      desc: 'Complete member records and relationship tracking' 
    },
    { 
      icon: '💰', 
      title: 'Financial Management', 
      desc: 'Multi-currency billing and financial reporting' 
    },
    { 
      icon: '📊', 
      title: 'Advanced Analytics', 
      desc: 'Real-time insights and performance metrics' 
    },
    { 
      icon: '🌍', 
      title: 'Global Infrastructure', 
      desc: 'Multi-language support for 190+ countries' 
    },
    { 
      icon: '🔒', 
      title: 'Enterprise Security', 
      desc: 'Bank-grade security and GDPR compliance' 
    },
    { 
      icon: '🔄', 
      title: 'Workflow Automation', 
      desc: 'Customizable workflows for all operations' 
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
    <div className="container">
      <div className="background"></div>
      
      <div className={`content ${isVisible ? 'visible' : ''}`}>
        
        <header className="header">
          <div className="logo">
            <span className="logoIcon">🌐</span>
            <span className="logoText">TrendWave Connect</span>
          </div>
          <div className="headerButtons">
            <button onClick={navigateToWebsite} className="secondaryButton">
              Website
            </button>
            <button onClick={navigateToLogin} className="primaryButton">
              Admin Login
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="heroContent">
            <h1 className="heroTitle">
              One Platform for
              <span className="highlight"> Every Organization</span>
            </h1>
            <p className="heroSubtitle">
              The world's most comprehensive management platform for schools, businesses, 
              governments, and organizations of all types.
            </p>
            
            <div className="heroButtons">
              <button onClick={navigateToRegister} className="ctaButton">
                Start Free Trial
              </button>
              <button onClick={navigateToLogin} className="outlineButton">
                Admin Portal
              </button>
            </div>

            <div className="stats">
              <div className="stat">
                <span className="statNumber">1,200+</span>
                <span className="statLabel">Organizations</span>
              </div>
              <div className="stat">
                <span className="statNumber">85+</span>
                <span className="statLabel">Countries</span>
              </div>
              <div className="stat">
                <span className="statNumber">99.9%</span>
                <span className="statLabel">Uptime</span>
              </div>
            </div>
          </div>
          
          <div className="illustration">
            <div className="floatingElement el1">🏢</div>
            <div className="floatingElement el2">🎓</div>
            <div className="floatingElement el3">🏛️</div>
          </div>
        </section>

        <section className="organizations">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Trusted Worldwide</h2>
            <p className="sectionSubtitle">
              Serving diverse organizations across every sector and continent
            </p>
          </div>
          
          <div className="orgGrid">
            {organizationTypes.map((org, index) => (
              <div key={index} className="orgCard">
                <div className="orgIcon">{org.icon}</div>
                <h3 className="orgName">{org.name}</h3>
                <span className="orgCount">{org.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="features">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Enterprise-Grade Features</h2>
            <p className="sectionSubtitle">
              Comprehensive tools designed for organizations of all types and sizes
            </p>
          </div>
          
          <div className="featuresGrid">
            {features.map((feature, index) => (
              <div key={index} className="featureCard">
                <div className="featureIcon">{feature.icon}</div>
                <h3 className="featureTitle">{feature.title}</h3>
                <p className="featureDesc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="global">
          <div className="globalContent">
            <div className="globalText">
              <h2 className="globalTitle">Truly Global Infrastructure</h2>
              <p className="globalDesc">
                With data centers across 6 continents and support for 190+ countries, 
                we ensure optimal performance and compliance wherever your organization operates.
              </p>
              <div className="globalStats">
                <div className="globalStat">
                  <strong>6</strong>
                  <span>Continents</span>
                </div>
                <div className="globalStat">
                  <strong>190+</strong>
                  <span>Countries</span>
                </div>
                <div className="globalStat">
                  <strong>50+</strong>
                  <span>Languages</span>
                </div>
                <div className="globalStat">
                  <strong>24/7</strong>
                  <span>Support</span>
                </div>
              </div>
            </div>
            <div className="globalMap">
              <div className="mapPlaceholder">🌍</div>
            </div>
          </div>
        </section>

        <section className="ctaSection">
          <div className="ctaCard">
            <h2 className="ctaTitle">Ready to Transform Your Organization?</h2>
            <p className="ctaText">
              Join thousands of organizations worldwide using TrendWave Connect.
            </p>
            <div className="ctaButtons">
              <button onClick={navigateToRegister} className="ctaButton">
                Start Your Free Trial
              </button>
              <button onClick={navigateToWebsite} className="contactButton">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footerContent">
            <div className="footerBrand">
              <div className="logo">
                <span className="logoIcon">🌐</span>
                <span className="logoText">TrendWave Connect</span>
              </div>
              <p className="footerText">
                Empowering organizations worldwide through innovative technology
              </p>
            </div>
            
            <div className="footerLinks">
              <div className="linkGroup">
                <strong className="linkTitle">Platform</strong>
                <a href="/auth/login" className="footerLink">Admin Login</a>
                <a href="/auth/register" className="footerLink">Register</a>
                <a href="https://trendwaveconnect.com/features" className="footerLink">Features</a>
              </div>
              
              <div className="linkGroup">
                <strong className="linkTitle">Support</strong>
                <a href="mailto:support@trendwaveconnect.com" className="footerLink">
                  support@trendwaveconnect.com
                </a>
                <a href="mailto:sales@trendwaveconnect.com" className="footerLink">
                  sales@trendwaveconnect.com
                </a>
                <a href="mailto:contact@trendwaveconnect.com" className="footerLink">
                  contact@trendwaveconnect.com
                </a>
              </div>
              
              <div className="linkGroup">
                <strong className="linkTitle">Company</strong>
                <a href="https://trendwaveconnect.com" className="footerLink">Website</a>
                <a href="https://trendwaveconnect.com/about" className="footerLink">About Us</a>
                <a href="https://trendwaveconnect.com/contact" className="footerLink">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="footerBottom">
            <p className="copyright">
              © 2024-2026 TrendWave Connect. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                     radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
        }
        
        .content {
          position: relative;
          z-index: 2;
          transition: all 0.8s ease-out;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .content.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
        }
        
        .logoText {
          background: linear-gradient(45deg, #fff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .headerButtons {
          display: flex;
          gap: 0.5rem;
        }
        
        .primaryButton, .secondaryButton {
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .primaryButton {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .primaryButton:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .secondaryButton {
          background: transparent;
        }
        
        .secondaryButton:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 2rem 2rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
          gap: 2rem;
        }
        
        .heroContent {
          color: white;
        }
        
        .heroTitle {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 0.8rem 0;
          background: linear-gradient(45deg, #fff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .highlight {
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }
        
        .heroSubtitle {
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
          opacity: 0.9;
          max-width: 400px;
        }
        
        .heroButtons {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .ctaButton {
          background: linear-gradient(45deg, #f59e0b, #d97706);
          border: none;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }
        
        .ctaButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6);
        }
        
        .outlineButton {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .outlineButton:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .stats {
          display: flex;
          gap: 1.5rem;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
        }
        
        .statNumber {
          font-size: 1.2rem;
          font-weight: 800;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .statLabel {
          font-size: 0.7rem;
          opacity: 0.8;
        }
        
        .illustration {
          position: relative;
          height: 250px;
        }
        
        .floatingElement {
          position: absolute;
          font-size: 2.5rem;
          animation: float 3s ease-in-out infinite;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.6rem;
          backdrop-filter: blur(10px);
        }
        
        .el1 { top: 20%; left: 20%; animation-delay: 0s; }
        .el2 { top: 50%; right: 30%; animation-delay: 1s; }
        .el3 { bottom: 20%; left: 40%; animation-delay: 2s; }
        
        .sectionHeader {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .sectionTitle {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          color: #1f2937;
        }
        
        .sectionSubtitle {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .organizations {
          background: white;
          padding: 3rem 2rem;
        }
        
        .orgGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .orgCard {
          background: white;
          padding: 1.2rem;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          border: 1px solid #f3f4f6;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .orgCard:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        
        .orgIcon {
          font-size: 1.8rem;
          margin-bottom: 0.6rem;
        }
        
        .orgName {
          font-size: 0.8rem;
          font-weight: 600;
          margin: 0 0 0.4rem 0;
          color: #1f2937;
        }
        
        .orgCount {
          font-size: 0.7rem;
          color: #f59e0b;
          font-weight: 700;
        }
        
        .features {
          background: #f8fafc;
          padding: 3rem 2rem;
        }
        
        .featuresGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .featureCard {
          background: white;
          padding: 1.2rem;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          border: 1px solid #f3f4f6;
          transition: all 0.3s ease;
        }
        
        .featureCard:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        
        .featureIcon {
          font-size: 1.8rem;
          margin-bottom: 0.8rem;
        }
        
        .featureTitle {
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0 0 0.4rem 0;
          color: #1f2937;
        }
        
        .featureDesc {
          font-size: 0.75rem;
          color: #6b7280;
          line-height: 1.4;
          margin: 0;
        }
        
        .global {
          background: white;
          padding: 3rem 2rem;
        }
        
        .globalContent {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .globalTitle {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 0.8rem 0;
          color: #1f2937;
        }
        
        .globalDesc {
          font-size: 0.8rem;
          color: #6b7280;
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
        }
        
        .globalStats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .globalStat {
          text-align: center;
          padding: 0.8rem;
          background: #f8fafc;
          border-radius: 8px;
        }
        
        .globalStat strong {
          display: block;
          font-size: 1.1rem;
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 0.2rem;
        }
        
        .globalStat span {
          font-size: 0.7rem;
          color: #6b7280;
        }
        
        .mapPlaceholder {
          font-size: 6rem;
          text-align: center;
          animation: rotate 20s linear infinite;
        }
        
        .ctaSection {
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          padding: 3rem 2rem;
        }
        
        .ctaCard {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        
        .ctaTitle {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 0.8rem 0;
          color: #1f2937;
        }
        
        .ctaText {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0 0 1.5rem 0;
        }
        
        .ctaButtons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .contactButton {
          background: transparent;
          border: 1px solid #1e3a8a;
          color: #1e3a8a;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .contactButton:hover {
          background: #1e3a8a;
          color: white;
        }
        
        .footer {
          background: #1f2937;
          color: white;
          padding: 2rem 2rem 1rem;
        }
        
        .footerContent {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto 1.5rem;
        }
        
        .footerBrand {
          max-width: 200px;
        }
        
        .footerText {
          font-size: 0.75rem;
          color: #9ca3af;
          line-height: 1.4;
          margin: 0.5rem 0 0 0;
        }
        
        .footerLinks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .linkGroup {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        
        .linkTitle {
          font-size: 0.8rem;
          margin-bottom: 0.6rem;
          color: white;
        }
        
        .footerLink {
          font-size: 0.7rem;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footerLink:hover {
          color: white;
        }
        
        .footerBottom {
          border-top: 1px solid #374151;
          padding-top: 1rem;
          text-align: center;
        }
        
        .copyright {
          font-size: 0.7rem;
          color: #9ca3af;
          margin: 0;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .header {
            padding: 1rem;
          }
          
          .hero {
            grid-template-columns: 1fr;
            padding: 1.5rem 1rem 3rem;
            text-align: center;
          }
          
          .globalContent {
            grid-template-columns: 1fr;
          }
          
          .footerContent {
            grid-template-columns: 1fr;
          }
          
          .footerLinks {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
