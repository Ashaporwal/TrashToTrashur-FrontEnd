

import React, { useState } from "react";
import axios from "axios";
import OrderConfirmationModal from "../Order/OrderConfirmationModal";

const OrderNowModel = ({ material, onClose, onOrderPlaced }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const currentUser = JSON.parse(sessionStorage.getItem("current-user"));

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter delivery address!");
      return;
    }

    try {
      // Only COD order placement
      const res = await axios.post("http://localhost:5000/order", {
        materialId: material._id,
        seller: material.submittedBy._id,
        buyer: currentUser._id,
        quantity: Number(quantity),
        totalPrice: Number(quantity) * Number(material.price),
        address,
        paymentMethod, // store the payment method
        images: material.images || [],
      });

      setConfirmedOrder(res.data.order || res.data);
      console.log("Confirmed order:", res.data.order || res.data);

      if (onOrderPlaced) onOrderPlaced();
    } catch (err) {
      console.error("Order placement error:", err.response || err);
      alert("❌ Failed to place order!");
    }
  };

  return (
    <>
      {/* Main Order Modal */}
      {!confirmedOrder && (
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
            <p>Price per unit: <strong>₹{material.price}</strong></p>
            <p>Available Stock: <strong>{material.quantity}</strong></p>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              max={material.quantity}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
            />

            <input
              type="text"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label>Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Online" disabled>Online Payment </option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={handlePlaceOrder}
                style={{ backgroundColor: "#28a745", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Place Order
              </button>
              <button
                onClick={onClose}
                style={{ backgroundColor: "#dc3545", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}
    </>
  );
};

export default OrderNowModel;



// import React, { useState } from "react";
// import axios from "axios";
// import OrderConfirmationModal from "../Order/OrderConfirmationModal";

// const OrderNowModel = ({ material, onClose, onOrderPlaced }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [address, setAddress] = useState("");
//   const [confirmedOrder, setConfirmedOrder] = useState(null);

//   const currentUser = JSON.parse(sessionStorage.getItem("current-user"));
// const handlePlaceOrder = async () => {
//   if (!address) {
//     alert("Please enter delivery address!");
//     return;
//   }

//   try {
//     const res = await axios.post("http://localhost:5000/order", {
//       materialId: material._id,
//       seller: material.submittedBy._id,
//       buyer: currentUser._id,
//       quantity: Number(quantity),
//       totalPrice: Number(quantity) * Number(material.price),
//       address,
//       paymentStatus: "COD",  // COD mark
//       images: material.images || [],
//     });

//     setConfirmedOrder(res.data.order || res.data);
//     console.log("Confirmed order:", res.data.order || res.data);

//     if (onOrderPlaced) onOrderPlaced();

//   } catch (err) {
//     console.error("Order placement error:", err.response || err);
//     alert("❌ Failed to place order!");
//   }
// };



//   const handleOnlinePayment = async () => {
//   if (!address) {
//     alert("Please enter delivery address!");
//     return;
//   }

//   const totalPrice = Number(quantity) * Number(material.price);

//   try {
//     const paymentRes = await axios.post("http://localhost:5000/payment/create", {
//       amount: totalPrice,
//       buyer: currentUser._id,
//       materialId: material._id,
//     });

//     const { orderId, key } = paymentRes.data;

//     const options = {
//       key,
//       amount: totalPrice * 100,
//       currency: "INR",
//       name: material.title,
//       order_id: orderId,
//       handler: async function (response) {
//         await handlePlaceOrder({ paymentId: response.razorpay_payment_id, status: "paid" });
//       },
//       prefill: { name: currentUser.name, email: currentUser.email },
//       theme: { color: "#28a745" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (err) {
//     console.error("Payment error:", err);
//     alert("❌ Payment failed!");
//   }
// };


//   return (
//     <>
//       {/* Main Order Modal */}
//       {!confirmedOrder && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           backgroundColor: "rgba(0, 0, 0, 0.6)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000,
//           padding: "10px",
//         }}>
//           <div style={{
//             backgroundColor: "#fff",
//             borderRadius: "12px",
//             width: "100%",
//             maxWidth: "450px",
//             padding: "25px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//           }}>
//             <h2 style={{ margin: 0 }}>{material.title}</h2>
//             <p>Price per unit: <strong>₹{material.price}</strong></p>
//             <p>Available Stock: <strong>{material.quantity}</strong></p>

//             <input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               min={1}
//               max={material.quantity}
//               style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
//             />

//             <input
//               type="text"
//               placeholder="Enter delivery address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
//             />

//             <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//               <button
//                 onClick={handlePlaceOrder}
//                 style={{ backgroundColor: "#28a745", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}
//               >
//                 Place Order
//               </button>
//               <button
//                 onClick={onClose}
//                 style={{ backgroundColor: "#dc3545", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirmation Modal */}
// {confirmedOrder && (
//   <OrderConfirmationModal
//     order={confirmedOrder}
//     onClose={() => setConfirmedOrder(null)} // parent modal ko close mat karo
//   />
// )}

//     </>
//   );
// };

// export default OrderNowModel;
