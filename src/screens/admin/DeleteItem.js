import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteItem() {
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [searchName, setSearchName] = useState('');

  const handleSearch = async () => {
    if (!searchName.trim()) return alert("Please enter an item name.");

    try {
      const res = await fetch(`http://localhost:5000/api/admin/getitem/${encodeURIComponent(searchName)}`);
      const data = await res.json();

      if (data.success) {
        setItem(data.item);
      } else {
        alert("❌ Item not found");
        setItem(null);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("🚨 Error fetching item from server");
    }
  };

  const handleDelete = async () => {
    if (!item || !item.name) return alert("No item selected.");

    const confirm = window.confirm(`Are you sure you want to delete "${item.name}"?`);
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete-item/${encodeURIComponent(item.name)}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Item deleted successfully");
        navigate('/admindashboard');
      } else {
        alert("❌ Failed to delete item");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("🚨 Server error while deleting item");
    }
  };

  const renderPrice = (label, value) => {
    if (value === undefined || value === null || value === '') return `${label} - ₹-`;
    return `${label} - ₹${value}`;
  };

  return (
    <div className="container mt-4">
      <h3>Delete Food Item</h3>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Item Name to Search"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={handleSearch}>
          🔍 Search
        </button>
      </div>

      {item && (
        <div className="card p-3 mt-3">
          <h5><strong>Item:</strong> {item.name}</h5>
          <p><strong>Category:</strong> {item.CategoryName}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <img
            src={item.img}
            alt={item.name}
            className="img-thumbnail mb-2"
            style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
          />
          <p><strong>Prices:</strong></p>
          <ul>
            <li>{renderPrice('Half', item.options[0]?.half)}</li>
            <li>{renderPrice('Full', item.options[0]?.full)}</li>
          </ul>
          <button className="btn btn-danger" onClick={handleDelete}>🗑️ Delete Item</button>
        </div>
      )}
    </div>
  );
}
