import React from "react";

const OrderConfirmationModal = ({ order, onClose }) => {
  if (!order) return null;

  const productName = order.material?.title || "Unknown Product";
  const price = order.totalPrice || 0;
  const deliveryAddress = order.address || "Not Provided";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          minWidth: "350px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#28a745" }}>🎉 Congratulations!</h2>
        <p>Your order has been placed successfully.</p>
        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Total Price:</strong> ₹{price}</p>
        <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
        <p><strong>Status:</strong> {order.status}</p>

        <button
          onClick={onClose}
          style={{
            marginTop: "15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
