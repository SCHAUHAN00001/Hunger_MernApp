import React, { useState, useEffect } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users');
      const data = await res.json();
      if (data.success) setUsers(data.users);
      else alert("❌ Failed to load users");
    } catch (err) {
      alert("🚨 Server error while fetching users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete-user/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u._id !== id));
        alert("✅ User deleted successfully");
      } else {
        alert("❌ Failed to delete user");
      }
    } catch (err) {
      alert("🚨 Server error while deleting user");
      console.error(err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h3 className="mb-3">👤 All Registered Users</h3>

      <input
        type="text"
        placeholder="🔍 Search by name or email"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.date).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
