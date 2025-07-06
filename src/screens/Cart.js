// src/screens/Cart.js
import React from 'react';
import { useCart, useDispatchCart } from '../components/ContexReducer';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>Your Cart is Empty 😢</h4>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = cart
    .reduce((total, item) => total + item.qty * parseFloat(item.price), 0)
    .toFixed(2);

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE', index });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 My Cart</h2>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Price (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>{item.qty}</td>
              <td>{(item.qty * parseFloat(item.price)).toFixed(2)}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleRemove(idx)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mt-4">
          <strong>Total: ₹{totalPrice}</strong>
        </h5>
        <button className="btn btn-success mt-4" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
