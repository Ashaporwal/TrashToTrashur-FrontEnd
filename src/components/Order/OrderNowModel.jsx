import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderNowModel = ({ material, onClose, onOrderPlaced }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error("Enter delivery address!");
      return;
    }

    if (quantity > material.quantity) {
      toast.error("Quantity exceeds available stock!");
      return;
    }

    try {
      const currentUser = JSON.parse(sessionStorage.getItem("current-user"));
      await axios.post("http://localhost:5000/order/", {
        buyer: currentUser._id,
        materialId: material._id,
        quantity,
        totalPrice: quantity * material.price,
        address,
        notes
      });

      toast.success("Order placed successfully!");
      onOrderPlaced?.(); // refresh orders or update cart
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to place order!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          width: "420px",
          maxWidth: "90%",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          overflowY: "auto"
        }}
      >
        <h3 style={{ marginBottom: "15px", textAlign: "center" }}>Order Now</h3>

        <div style={{ textAlign: "center" }}>
          <img
            src={material.images?.[0] ? `http://localhost:5000${material.images[0]}` : ""}
            alt={material.title}
            style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
          />
          <h4>{material.title}</h4>
          <p style={{ fontSize: "14px", color: "#555" }}>{material.description}</p>
          <p style={{ fontSize: "13px", color: "#777" }}>Category: {material.category}</p>
          <p>Price per item: ₹{material.price}</p>
          <p>Available Stock: {material.quantity}</p>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={material.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <label>Delivery Address:</label>
          <textarea
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
          />

          <label>Additional Notes (Optional):</label>
          <textarea
            placeholder="Any special instructions?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
          />

          <p style={{ fontWeight: "bold", marginBottom: "15px" }}>Total Price: ₹{quantity * material.price}</p>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handlePlaceOrder}
              style={{
                padding: "10px 15px",
                borderRadius: "5px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                flex: 1,
                marginRight: "10px"
              }}
            >
              Place Order
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "10px 15px",
                borderRadius: "5px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                flex: 1
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNowModel;

