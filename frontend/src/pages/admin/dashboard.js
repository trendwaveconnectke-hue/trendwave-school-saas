import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [school, setSchool] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const schoolName = localStorage.getItem('school_name');
    const schoolId = localStorage.getItem('school_id');
    
    if (!token) {
      router.push('/auth/login');
      return;
    }
    
    setSchool({
      name: schoolName || 'TrendWave Connect School',
      id: schoolId || 'TWC0001'
    });
  }, [router]);

  // Quick Actions Data
  const quickActions = [
    { icon: '👥', label: 'Students', action: () => setActiveTab('students') },
    { icon: '👨‍🏫', label: 'Teachers', action: () => setActiveTab('teachers') },
    { icon: '📚', label: 'Classes', action: () => setActiveTab('classes') },
    { icon: '💰', label: 'Fees', action: () => setActiveTab('fees') },
    { icon: '📊', label: 'Grades', action: () => setActiveTab('grades') },
    { icon: '📅', label: 'Schedule', action: () => setActiveTab('schedule') },
    { icon: '💬', label: 'Messages', action: () => setActiveTab('messages') },
    { icon: '⚙️', label: 'Settings', action: () => setActiveTab('settings') }
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };

  if (!school) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your school dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>🎓</div>
            <div>
              <h1 style={styles.schoolName}>{school.name}</h1>
              <p style={styles.schoolId}>ID: {school.id}</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <button style={styles.notificationBtn}>🔔</button>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {activeTab === 'dashboard' && (
          <div style={styles.dashboard}>
            {/* Stats Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>👥</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statNumber}>0</h3>
                  <p style={styles.statLabel}>Students</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>👨‍🏫</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statNumber}>0</h3>
                  <p style={styles.statLabel}>Teachers</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>📚</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statNumber}>0</h3>
                  <p style={styles.statLabel}>Classes</p>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>💰</div>
                <div style={styles.statInfo}>
                  <h3 style={styles.statNumber}>0%</h3>
                  <p style={styles.statLabel}>Fees Paid</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Quick Actions</h2>
              <div style={styles.actionsGrid}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    style={styles.actionButton}
                  >
                    <span style={styles.actionIcon}>{action.icon}</span>
                    <span style={styles.actionLabel}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Recent Activity</h2>
              <div style={styles.activityCard}>
                <p style={styles.activityText}>
                  🎉 Welcome to TrendWave Connect! Your school dashboard is ready.
                </p>
                <p style={styles.activityText}>
                  📝 Start by adding students, teachers, and classes to get started.
                </p>
                <p style={styles.activityText}>
                  💰 Set up fee structure to begin collecting payments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs will be implemented next */}
        {activeTab !== 'dashboard' && (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
            <p style={styles.comingSoon}>
              🚧 {activeTab} management coming soon...
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation - KCB Style */}
      <nav style={styles.bottomNav}>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'dashboard' && styles.navButtonActive)
          }}
          onClick={() => setActiveTab('dashboard')}
        >
          <span style={styles.navIcon}>🏠</span>
          <span style={styles.navLabel}>Home</span>
        </button>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'students' && styles.navButtonActive)
          }}
          onClick={() => setActiveTab('students')}
        >
          <span style={styles.navIcon}>👥</span>
          <span style={styles.navLabel}>Students</span>
        </button>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'fees' && styles.navButtonActive)
          }}
          onClick={() => setActiveTab('fees')}
        >
          <span style={styles.navIcon}>💰</span>
          <span style={styles.navLabel}>Fees</span>
        </button>
        <button 
          style={{
            ...styles.navButton,
            ...(activeTab === 'messages' && styles.navButtonActive)
          }}
          onClick={() => setActiveTab('messages')}
        >
          <span style={styles.navIcon}>💬</span>
          <span style={styles.navLabel}>Messages</span>
        </button>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f8fafc'
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #1E3A8A',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  loadingText: {
    color: '#6B7280',
    fontSize: '16px'
  },
  header: {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e5e7eb'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  logo: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #1E3A8A, #3730A3)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white'
  },
  schoolName: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1F2937',
    margin: 0
  },
  schoolId: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  notificationBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '8px'
  },
  logoutBtn: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem',
    paddingBottom: '80px' // Space for bottom nav
  },
  dashboard: {
    spaceY: '2rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid #e5e7eb'
  },
  statIcon: {
    fontSize: '2rem',
    background: '#1E3A8A',
    color: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statInfo: {
    flex: 1
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 0.25rem 0'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
    margin: 0
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 1rem 0'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem'
  },
  actionButton: {
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  },
  actionIcon: {
    fontSize: '1.5rem'
  },
  actionLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151'
  },
  activityCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  activityText: {
    margin: '0 0 0.5rem 0',
    color: '#4B5563'
  },
  tabContent: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  tabTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 1rem 0'
  },
  comingSoon: {
    color: '#6B7280',
    fontSize: '1rem',
    textAlign: 'center',
    padding: '2rem'
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'white',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0.5rem 0',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
  },
  navButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    flex: 1,
    transition: 'all 0.2s'
  },
  navButtonActive: {
    color: '#1E3A8A'
  },
  navIcon: {
    fontSize: '1.25rem'
  },
  navLabel: {
    fontSize: '0.75rem',
    fontWeight: '500'
  }
};

// Add CSS animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);
