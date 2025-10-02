import React, { useState } from 'react'

const SchoolLogin = () => {
  const [formData, setFormData] = useState({
    schoolCode: '',
    email: '',
    password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    alert('Login will work after deployment! School: ' + formData.schoolCode)
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2>TrendWave Connect</h2>
        <p>School Management System</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="School Code"
            value={formData.schoolCode}
            onChange={(e) => setFormData({...formData, schoolCode: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login to School
          </button>
        </form>

        <p style={styles.adminLink}>
          <a href="/admin">Super Admin Access</a>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f5f5f5',
    fontFamily: 'Arial, sans-serif'
  },
  loginBox: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '12px',
    background: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  adminLink: {
    marginTop: '20px',
    fontSize: '14px'
  }
}

export default SchoolLogin
