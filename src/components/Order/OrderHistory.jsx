import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = ({ refresh }) => {
  const [orders, setOrders] = useState([]);

  const currentUser = JSON.parse(sessionStorage.getItem("current-user"));

  useEffect(() => {
    if (!currentUser?._id) return;
    fetchOrders();
  }, [refresh]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/order/user/${currentUser._id}`
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    }
  };

  if (!orders.length) return <p>No Orders Yet</p>;

  return (
    <div>
      {orders.map((o) => (
        <div key={o._id} className="order-card">
          <h3>{o.material?.title || "Unknown Material"}</h3>
          <p>Qty: {o.quantity}</p>
          <p>Total: ₹{o.totalPrice}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;



