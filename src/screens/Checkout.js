import React, { useEffect, useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContexReducer';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [, setUser] = useState({});
  const [address, setAddress] = useState('');
  const [mode, setMode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return navigate('/login');

      try {
        const res = await fetch('http://localhost:5000/api/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });

        if (!res.ok) {
          localStorage.removeItem('authToken');
          return navigate('/login');
        }

        const json = await res.json();
        if (json.success) {
          setUser(json.user);
          setAddress(json.user.location || '');
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error("🚨 Error fetching user:", err);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const total = cart.reduce((sum, it) => sum + parseFloat(it.price) * it.qty, 0).toFixed(2);

  const handlePay = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return alert("Session expired. Please login again.");

    try {
      // 1. Update Address
      const res = await fetch('http://localhost:5000/api/updateaddress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ location: address })
      });

      const result = await res.json();
      if (!result.success) return alert('❌ Failed to save address');

      // 2. Validate Payment
      if (mode === 'upi' && upiId.trim() === '') return alert('⚠️ Enter UPI ID');
      if ((mode === 'credit' || mode === 'debit') &&
        (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.nameOnCard)) {
        return alert('⚠️ Fill all card details');
      }

      // 3. Save Order
      const orderRes = await fetch('http://localhost:5000/api/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({
          items: cart,
          paymentMode: mode,
          address
        })
      });

      const orderJson = await orderRes.json();
      if (!orderJson.success) return alert("❌ Failed to place order");

      // 4. Finish
      alert(`✅ Order placed successfully!\nPayment mode: ${mode.toUpperCase()}`);
      dispatch({ type: 'CLEAR' });
      navigate('/');
    } catch (err) {
      console.error("🚨 Error during checkout:", err);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout 🛒</h2>

      <div className="card mb-4 p-3">
        <h5>Delivery Address:</h5>
        <textarea
          style={{ width: '100%' }}
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="card mb-4 p-3">
        <h5>Select Payment Method:</h5>
        {['upi', 'credit', 'debit'].map((m) => (
          <div key={m} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payMode"
              id={m}
              checked={mode === m}
              onChange={() => setMode(m)}
            />
            <label className="form-check-label" htmlFor={m}>
              {m.toUpperCase()}
            </label>
          </div>
        ))}
      </div>

      {mode === 'upi' && (
        <div className="card mb-4 p-3">
          <label>Enter UPI ID:</label>
          <input
            type="text"
            className="form-control"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      )}

      {(mode === 'credit' || mode === 'debit') && (
        <div className="card mb-4 p-3">
          <label>Card Number</label>
          <input
            type="text"
            className="form-control mb-2"
            value={cardDetails.cardNumber}
            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
            placeholder="XXXX XXXX XXXX XXXX"
          />
          <div className="row">
            <div className="col-md-4">
              <label>Expiry</label>
              <input
                type="text"
                className="form-control mb-2"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                placeholder="MM/YY"
              />
            </div>
            <div className="col-md-4">
              <label>CVV</label>
              <input
                type="password"
                className="form-control mb-2"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                placeholder="123"
              />
            </div>
            <div className="col-md-4">
              <label>Name on Card</label>
              <input
                type="text"
                className="form-control mb-2"
                value={cardDetails.nameOnCard}
                onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                placeholder="John Doe"
              />
            </div>
          </div>
        </div>
      )}

      <div className="card p-3 mb-4">
        <h5>Items:</h5>
        <ul className="list-group">
          {cart.map((it, i) => (
            <li key={i} className="list-group-item">
              {it.name} — {it.size} × {it.qty} = ₹{(parseFloat(it.price) * it.qty).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="mt-2 text-end">
          <strong>Total: ₹{total}</strong>
        </div>
      </div>

      <button className="btn btn-success w-100" onClick={handlePay}>
        Proceed to Pay ₹{total}
      </button>
    </div>
  );
}

export default Checkout;
