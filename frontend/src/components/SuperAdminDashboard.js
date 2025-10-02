import React, { useState } from 'react';

const SuperAdminDashboard = () => {
  const [schools, setSchools] = useState([]);
  const [newSchool, setNewSchool] = useState({
    name: '',
    adminEmail: '',
    schoolCode: '',
    plan: 'starter'
  });

  const createSchool = async (e) => {
    e.preventDefault();
    alert(`School created: ${newSchool.name}\nTemporary password: temp123`);
    setSchools([...schools, { ...newSchool, id: Date.now() }]);
    setNewSchool({ name: '', adminEmail: '', schoolCode: '', plan: 'starter' });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>TrendWave Connect - Super Admin</h1>
        <p>Manage All Schools</p>
      </header>

      <div style={styles.content}>
        {/* Create School Form */}
        <div style={styles.card}>
          <h2>Create New School</h2>
          <form onSubmit={createSchool} style={styles.form}>
            <input
              type="text"
              placeholder="School Name"
              value={newSchool.name}
              onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Admin Email"
              value={newSchool.adminEmail}
              onChange={(e) => setNewSchool({...newSchool, adminEmail: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="School Code"
              value={newSchool.schoolCode}
              onChange={(e) => setNewSchool({...newSchool, schoolCode: e.target.value})}
              style={styles.input}
              required
            />
            <select
              value={newSchool.plan}
              onChange={(e) => setNewSchool({...newSchool, plan: e.target.value})}
              style={styles.input}
            >
              <option value="starter">Starter (Free)</option>
              <option value="growth">Growth ($99/yr)</option>
              <option value="premium">Premium ($199/yr)</option>
            </select>
            <button type="submit" style={styles.button}>
              Create School
            </button>
          </form>
        </div>

        {/* Schools List */}
        <div style={styles.card}>
          <h2>All Schools ({schools.length})</h2>
          <div style={styles.schoolsList}>
            {schools.map(school => (
              <div key={school.id} style={styles.schoolItem}>
                <h3>{school.name}</h3>
                <p>Code: {school.schoolCode} | Plan: {school.plan}</p>
                <p>Admin: {school.adminEmail}</p>
                <span style={styles.activeBadge}>Active</span>
              </div>
            ))}
            {schools.length === 0 && (
              <p style={styles.noSchools}>No schools created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background: '#2196F3',
    color: 'white',
    padding: '20px',
    textAlign: 'center'
  },
  content: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '12px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  schoolsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  schoolItem: {
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '5px',
    background: '#f9f9f9'
  },
  activeBadge: {
    background: '#4CAF50',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '3px',
    fontSize: '12px'
  },
  noSchools: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  }
};

export default SuperAdminDashboard;
