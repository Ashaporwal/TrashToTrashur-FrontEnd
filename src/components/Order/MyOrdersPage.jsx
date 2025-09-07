import React, { useState } from "react";
import OrderNowModel from "./OrderNowModel";
import OrderHistory from "./OrderHistory";

const MyOrdersPage = ({ selectedMaterial }) => {
  const [showModal, setShowModal] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(false);

  // Callback: jab order place ho jaye
  const handleOrderPlaced = () => {
    setRefreshHistory((prev) => !prev); // refresh toggle
    setShowModal(false); // modal close
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders Page</h1>

      {/* Order Now button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px 20px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Order Now
      </button>

      {/* Modal open hoga jab showModal true hoga */}
      {showModal && (
        <OrderNowModel
          material={selectedMaterial}
          onClose={() => setShowModal(false)}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {/* Order history section */}
      <div
        style={{
          marginTop: "20px",
          background: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2>My Orders</h2>
        <OrderHistory refresh={refreshHistory} />
      </div>
    </div>
  );
};

export default MyOrdersPage;

