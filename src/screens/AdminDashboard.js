import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      <div className="d-grid gap-3 col-6 mx-auto">
        <Link to="/admin/additem" className="btn btn-outline-success btn-lg">
          ➕ Add Item
        </Link>

        <Link to="/admin/edititem" className="btn btn-outline-primary btn-lg">
          ✏️ Edit Item
        </Link>

        <Link to="/admin/delete-item" className="btn btn-outline-danger btn-lg">
          🗑️ Delete Item
        </Link>

        <Link to="/admin/users" className="btn btn-outline-warning btn-lg">
          👥 View / Delete User
        </Link>
      </div>
    </div>
  );
}
