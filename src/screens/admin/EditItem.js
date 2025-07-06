import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditIteam() {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    CategoryName: '',
    name: '',
    img: '',
    description: '',
    options: [{}]
  });

  const [searchName, setSearchName] = useState('');

  const handleSearch = async () => {
    if (!searchName.trim()) return alert("Please enter item name");

    try {
      const res = await fetch(`http://localhost:5000/api/admin/getitem/${encodeURIComponent(searchName)}`);
      const data = await res.json();

      if (data.success) {
        const fetchedItem = data.item;
        setItem(fetchedItem);
        alert("✅ Item found");
      } else {
        alert("❌ Item not found");
      }
    } catch (err) {
      console.error(err);
      alert("🚨 Error fetching item");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleOptionChange = (e, type) => {
    const updated = [...item.options];
    updated[0][type] = e.target.value;
    setItem({ ...item, options: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/admin/edititem/${item.name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Item updated");
        navigate('/admindashboard');
      } else {
        alert("❌ Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("🚨 Server error");
    }
  };

  const isPizza = item.CategoryName.toLowerCase() === 'pizza';

  return (
    <div className="container mt-4">
      <h3>Edit Food Item</h3>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search item by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          🔍 Search
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="CategoryName"
          value={item.CategoryName}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          className="form-control mb-2"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <input
          className="form-control mb-2"
          name="img"
          value={item.img}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <textarea
          className="form-control mb-2"
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <div className="row mb-3">
          {isPizza ? (
            <>
              <div className="col">
                <input
                  className="form-control"
                  value={item.options[0]?.regular || ''}
                  onChange={(e) => handleOptionChange(e, 'regular')}
                  placeholder="Regular Price"
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  value={item.options[0]?.medium || ''}
                  onChange={(e) => handleOptionChange(e, 'medium')}
                  placeholder="Medium Price"
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  value={item.options[0]?.large || ''}
                  onChange={(e) => handleOptionChange(e, 'large')}
                  placeholder="Large Price"
                />
              </div>
            </>
          ) : (
            <>
              <div className="col">
                <input
                  className="form-control"
                  value={item.options[0]?.half || ''}
                  onChange={(e) => handleOptionChange(e, 'half')}
                  placeholder="Half Price"
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  value={item.options[0]?.full || ''}
                  onChange={(e) => handleOptionChange(e, 'full')}
                  placeholder="Full Price"
                />
              </div>
            </>
          )}
        </div>

        <button type="submit" className="btn btn-success">
          💾 Save Item
        </button>
      </form>
    </div>
  );
}
