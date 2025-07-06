import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Register the user
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log("Register response:", json);

    if (json.success) {
      // ✅ Step 2: Auto-login the user
      const loginRes = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const loginJson = await loginRes.json();
      console.log("Login response:", loginJson);

      if (loginJson.success) {
        localStorage.setItem("authToken", loginJson.authToken);
        alert("✅ Account created & logged in");
        navigate('/'); 
      } else {
        alert("⚠️ Account created but login failed. Please login manually.");
        navigate('/login');
      }

    } else {
      alert("❌ Failed to create user: " + (json.error || 'Unknown error'));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="geolocation" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="m-3 btn btn-primary">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </div>
  );
}
