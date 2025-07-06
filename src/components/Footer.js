import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-dark text-white">
      <div className="col-md-6 d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" />
        <span className="text-muted">Shashank Chauhan © 2025 Foodie</span>
      </div>

      <div className="col-md-6 d-flex justify-content-end">
        <Link to="/adminlogin" className="btn btn-outline-light btn-sm">
          Admin Login
        </Link>
      </div>
    </footer>
  );
}
