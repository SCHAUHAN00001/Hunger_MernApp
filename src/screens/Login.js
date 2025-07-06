import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
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

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));  // ✅ Fixed typo
      navigate("/"); 
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container mt-4">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange} />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit" className="m-3 btn btn-primary">Submit</button>
        <Link to="/createuser" className="m-3 btn btn-danger">New User</Link>
      </form>
    </div>
  );
};

export default Login;


