import React, { useState, useEffect, useMemo } from 'react';
import { useDispatchCart, useCart } from './ContexReducer';

export default function Card({ name, description, options, img }) {
  const priceOptions = useMemo(() => {
    return options ? Object.keys(options) : [];
  }, [options]);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const dispatch = useDispatchCart();
  const cart = useCart();

  useEffect(() => {
    if (priceOptions.length > 0) {
      setSize(priceOptions[0]);
    }
  }, [priceOptions]);

  const finalPrice =
    size && options && options[size]
      ? (parseFloat(options[size]) * qty).toFixed(2)
      : '0.00';

  const handleAddToCart = () => {
    const existingItemIndex = cart.findIndex(
      (item) => item.id === name && item.size === size
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].qty += qty;

      const unitPrice = parseFloat(options[size]);
      updatedCart[existingItemIndex].price = (
        unitPrice * updatedCart[existingItemIndex].qty
      ).toFixed(2);

      dispatch({
        type: 'UPDATE',
        cart: updatedCart,
      });
    } else {
      dispatch({
        type: 'ADD',
        item: {
          id: name,
          name,
          price: (parseFloat(options[size]) * qty).toFixed(2),
          qty,
          size,
          img,
        },
      });
    }

    alert(`${qty} x ${name} (${size}) added to cart`);
  };

  return (
    <div className="container my-4">
      <div
        className="card"
        style={{ width: '18rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
      >
        <img
          src={img}
          className="card-img-top"
          alt={name}
          style={{ objectFit: 'cover', height: '160px' }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text mb-3">{description}</p>

          <div className="d-flex align-items-center justify-content-between mt-auto">
            <select
              className="form-select form-select-sm bg-danger text-white me-2"
              style={{ width: '70px' }}
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="form-select form-select-sm bg-danger text-white me-2"
              style={{ width: '90px' }}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data.charAt(0).toUpperCase() + data.slice(1)}
                </option>
              ))}
            </select>

            <span className="fs-6 fw-bold text-success">₹{finalPrice}</span>
          </div>

          <hr />

          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
