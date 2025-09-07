import React, { useState } from "react";
import axios from "axios";

const OrderNowModel = ({ material, onClose, onOrderPlaced }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const currentUser = JSON.parse(sessionStorage.getItem("current-user"));

  const handlePlaceOrder = async () => {
    // const handlePlaceOrder = async () => {
  console.log("Order payload:", {
    buyer: currentUser._id,
        material: material._id,
      seller: material.submittedBy._id,

    quantity,
    images: material.images || [],
    totalPrice: material.price * quantity,
    address,
  });


    if (!address) {
      alert("Please enter delivery address!");
      return;
    }

    try {
      // ✅ Fixed request body: include material, seller, buyer
const res = await axios.post("http://localhost:5000/order", {
  materialId: material._id, // <- yahan change
  seller: material.submittedBy._id,
  buyer: currentUser._id,
  quantity: Number(quantity),
  totalPrice: Number(quantity) * Number(material.price),
  address,
  images: material.images || [],
});



      
      // alert("✅ Order placed successfully!");
      if (onOrderPlaced) onOrderPlaced(); // check if function exists
      onClose(); // close modal
    } catch (err) {
      console.error("Order placement error:", err.response || err);
      alert("❌ Failed to place order!");
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "10px",
    }}>
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "450px",
        padding: "25px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}>
        <h2 style={{ margin: 0 }}>{material.title}</h2>
        <p style={{ margin: "5px 0" }}>Price per unit: <strong>₹{material.price}</strong></p>
        <p style={{ margin: "5px 0" }}>Available Stock: <strong>{material.quantity}</strong></p>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          max={material.quantity}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <input
          type="text"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            onClick={handlePlaceOrder}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderNowModel;






