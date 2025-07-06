import React, { useState } from 'react';

export default function AddItem() {
  const [item, setItem] = useState({
    CategoryName: '',
    name: '',
    img: '',
    description: '',
    options: [{ half: '', full: '' }], // default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => {
      // Update price labels if category changes
      if (name === 'CategoryName') {
        const isPizza = value.trim().toLowerCase() === 'pizza';
        return {
          ...prevItem,
          [name]: value,
          options: isPizza
            ? [{ regular: '', medium: '', large: '' }]
            : [{ half: '', full: '' }],
        };
      }
      return { ...prevItem, [name]: value };
    });
  };

  const handleOptionChange = (e, index, type) => {
    const newOptions = [...item.options];
    newOptions[index][type] = e.target.value;
    setItem({ ...item, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/admin/additem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ Item added successfully');
      setItem({
        CategoryName: '',
        name: '',
        img: '',
        description: '',
        options: [{ half: '', full: '' }],
      });
    } else {
      alert('❌ Failed to add item');
    }
  };

  const isPizza = item.CategoryName.trim().toLowerCase() === 'pizza';

  return (
    <div className="container mt-4">
      <h3>Add New Item</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="CategoryName"
          value={item.CategoryName}
          onChange={handleChange}
          placeholder="Category Name"
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

        <div className="row mb-2">
          {isPizza ? (
            <>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Regular Price"
                  value={item.options[0].regular}
                  onChange={(e) => handleOptionChange(e, 0, 'regular')}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Medium Price"
                  value={item.options[0].medium}
                  onChange={(e) => handleOptionChange(e, 0, 'medium')}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Large Price"
                  value={item.options[0].large}
                  onChange={(e) => handleOptionChange(e, 0, 'large')}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Half Price"
                  value={item.options[0].half}
                  onChange={(e) => handleOptionChange(e, 0, 'half')}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Full Price"
                  value={item.options[0].full}
                  onChange={(e) => handleOptionChange(e, 0, 'full')}
                  required
                />
              </div>
            </>
          )}
        </div>

        <button className="btn btn-success" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
}
