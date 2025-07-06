import React, { useEffect, useState } from 'react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('http://localhost:5000/api/myorders', {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });

      const data = await res.json();
      if (data.success) setOrders(data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Your Orders 🧾</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, idx) => {
          const total = order.items.reduce(
            (sum, item) => sum + parseFloat(item.price) * item.qty,
            0
          ).toFixed(2);

          return (
            <div className="card my-3" key={idx}>
              <div className="card-body">
                <h5 className="card-title">Order #{idx + 1}</h5>
                <p><strong>Payment Mode:</strong> {order.paymentMode.toUpperCase()}</p>
                <p><strong>Delivery Address:</strong> {order.address}</p>
                <p><strong>Items:</strong></p>
                <ul className="list-group list-group-flush mb-3">
                  {order.items.map((item, i) => (
                    <li className="list-group-item" key={i}>
                      {item.name} — {item.size} × {item.qty} = ₹{(item.price * item.qty).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> ₹{total}</p>
                <p className="text-muted mb-0">
                  Placed on: {new Date(order.date).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
