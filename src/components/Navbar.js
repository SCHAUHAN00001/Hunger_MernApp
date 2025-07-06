import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './ContexReducer';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCart();

  const isLoggedIn = localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const [username, setUsername] = useState('');

  const cartItemCount = cart.reduce((total, item) => total + parseInt(item.qty), 0);

  // Fetch username only for normal users
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token || isAdmin) return;

      try {
        const res = await fetch('http://localhost:5000/api/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        const json = await res.json();
        if (json.success) setUsername(json.user.name);
      } catch (err) {
        console.error('User fetch failed:', err);
      }
    };

    fetchUser();
  }, [isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  // Show only Home & Logout on any admin route
  if (isAdmin && location.pathname.startsWith('/admin')) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic text-white me-4" to="/">
            Hunger
          </Link>
          <Link className="nav-link text-white fw-normal fs-5 px-3" to="/">
            Home
          </Link>
          <div className="ms-auto">
            <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Default user navbar
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand fs-2 fst-italic text-white me-4" to="/">
            Hunger
          </Link>

          {isLoggedIn && username && (
            <span className="text-white fw-normal me-4">Welcome, {username}</span>
          )}

          <Link className="nav-link text-white fw-normal fs-5 px-3" to="/">
            Home
          </Link>

          {isLoggedIn && (
            <Link className="nav-link text-white fw-normal fs-5 px-3" to="/orders">
              My Orders
            </Link>
          )}
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item me-3 position-relative">
                  <Link className="nav-link text-white fw-normal fs-5 px-3" to="/cart">
                    My Cart
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger" style={{ fontSize: '0.75rem' }}>
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-normal fs-5 px-3" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-normal fs-5 px-3" to="/createuser">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
