import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isAdmin', 'true'); 
        alert('✅ Admin logged in successfully');
        navigate('/admindashboard'); 
      } else {
        alert('❌ Invalid credentials');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      alert('⚠️ Server error. Please try again later.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4">Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Admin Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-danger w-100">Login</button>
      </form>
    </div>
  );
}
