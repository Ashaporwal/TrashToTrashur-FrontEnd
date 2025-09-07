

import React, { useEffect, useState } from "react";
import "./CrafterMaterial.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Header";
import OrderNowModel from "../Order/OrderNowModel";
import { useNavigate } from "react-router-dom"; 
import OrderHistory from "../Order/OrderHistory";

function CrafterMaterialPage() {
  const [materials, setMaterials] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkoutItem, setCheckoutItem] = useState(null);

  const currentUserId = sessionStorage.getItem("userId");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/material/all");
      let mats = Array.isArray(res.data.allmaterial) ? res.data.allmaterial : [];
      mats = mats.filter((m) => m && m._id);
      setMaterials(mats);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
      setMaterials([]);
    }
  };

  const addToCart = (material) => {
    if (!material || !material._id) return;
    if (cart.some((item) => item._id === material._id)) {
      toast.warning("Already in cart!");
      return;
    }
    setCart((prev) => [...prev, material]);
    toast.success("Added to cart!");
  };

  const handleBuyNow = (material) => {
    if (!material || !material._id) return;
    setCheckoutItem(material); 
    console.log("Buy Now clicked:", material);
  };

  return (
    <>
      <ToastContainer />
      <div className="material-page">
        <Header />

        {/* Cart Icon */}
        <div
          className="cart-icon"
          onClick={() => {
            // cart icon click ke liye alag modal / page handle hoga
          }}
        >
          🛒 <span>{cart.length}</span>
        </div>

        {/* 👇 My Orders button */}
        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <button 
            onClick={() => navigate("/my-orders")} 
            className="my-orders-btn"
          >
            📦 My Orders
          </button>
        </div>

        <h2>Available Materials</h2>
        <div className="materials-grid">
          {materials.length === 0 && <p>No materials available.</p>}
          {materials.map((mat) =>
            mat && mat._id ? (
              <div key={mat._id} className="material-card">
                <div className="img-wrap">
                  {mat.images?.[0] ? (
                    <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                </div>
                <div className="card-info">
                  <h4>{mat.title}</h4>
                  <p>{mat.description}</p>
                  <small className="category">Category: {mat.category}</small>

                  <p>Price: ₹{mat.price}</p>
                  {mat.discount && <p className="discount">Discount: {mat.discount}% OFF</p>}

                  <p>Available Stock: {mat.quantity}</p>

                  {mat.sellerName && <p>👤 Seller: {mat.sellerName}</p>}
                  {mat.rating && <p>⭐ {mat.rating}/5</p>}
                  {mat.deliveryTime && <p>🚚 Delivery in: {mat.deliveryTime} days</p>}
                  {mat.location && <p>📍 Location: {mat.location}</p>}
                </div>
                <div className="card-buttons">
                  <button onClick={() => addToCart(mat)} className="add-to-cart-btn">
                    🛒 Add to Cart
                  </button>
                  <button onClick={() => handleBuyNow(mat)} className="buy-now-btn">
                    ⚡ Buy Now
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Buy Now Modal */}
        {checkoutItem && (
          <OrderNowModel
  material={checkoutItem}
  onClose={() => setCheckoutItem(null)}
  onOrderPlaced={() => {
    setCheckoutItem(null); // close modal after order
    fetchMaterials();       // refresh materials or orders if needed
    toast.success("Order placed successfully!"); // optional feedback
  }}
/>
        )}
      </div>
    </>
  );
}

export default CrafterMaterialPage;


// import React, { useEffect, useState } from "react";
// import "./CrafterMaterial.css";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import Header from "../Header";
// import OrderNowModel from "../Order/OrderNowModel";
// import { useNavigate } from "react-router-dom"; 
// import OrderHistory from "../Order/OrderHistory";

// function CrafterMaterialPage() {
//   const [materials, setMaterials] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [checkoutItem, setCheckoutItem] = useState(null);

//   const currentUserId = sessionStorage.getItem("userId");
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     fetchMaterials();
//   }, []);

//   const fetchMaterials = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/material/all");
//       let mats = Array.isArray(res.data.allmaterial) ? res.data.allmaterial : [];
//       mats = mats.filter((m) => m && m._id);
//       setMaterials(mats);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//       setMaterials([]);
//     }
//   };

//   const addToCart = (material) => {
//     if (!material || !material._id) return;
//     if (cart.some((item) => item._id === material._id)) {
//       toast.warning("Already in cart!");
//       return;
//     }
//     setCart((prev) => [...prev, material]);
//     toast.success("Added to cart!");
//   };

//   const handleBuyNow = (material) => {
//     if (!material || !material._id) return;
//     setCheckoutItem(material); 
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="material-page">
//         <Header />

//         {/* Cart Icon */}
//         <div
//           className="cart-icon"
//           onClick={() => {
//             // cart icon click ke liye alag modal / page handle hoga
//           }}
//         >
//           🛒 <span>{cart.length}</span>
//         </div>

//         {/* 👇 My Orders button */}
//         <div style={{ textAlign: "right", margin: "10px 0" }}>
//           <button 
//             onClick={() => navigate("/my-orders")} 
//             className="my-orders-btn"
//           >
//             📦 My Orders
//             {/* <OrderHistory/> */}
//           </button>
//         </div>

//         <h2>Available Materials</h2>
//         <div className="materials-grid">
//           {materials.length === 0 && <p>No materials available.</p>}
//           {materials.map((mat) =>
//             mat && mat._id ? (
//               <div key={mat._id} className="material-card">
//                 <div className="img-wrap">
//                   {mat.images?.[0] ? (
//                     <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} />
//                   ) : (
//                     <div className="image-placeholder">No Image</div>
//                   )}
//                 </div>
//                 <div className="card-info">
//                   <h4>{mat.title}</h4>
//                   <p>{mat.description}</p>
//                   <small className="category">{mat.category}</small>
//                   <p>Price: ₹{mat.price}</p>
//                   <p>Available Stock: {mat.quantity}</p>
//                 </div>
//                 <div className="card-buttons">
//                   <button onClick={() => addToCart(mat)} className="add-to-cart-btn">
//                     🛒 Add to Cart
//                   </button>
//                   <button onClick={() => handleBuyNow(mat)} className="buy-now-btn">
//                     ⚡ Buy Now
//                   </button>
//                 </div>
//               </div>
//             ) : null
//           )}
//         </div>

//         {/* Buy Now Modal */}
//         {checkoutItem && (
//           <OrderNowModel
//             material={checkoutItem}
//             onClose={() => setCheckoutItem(null)} // close button handle
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default CrafterMaterialPage;

//7 tareek..


// import React, { useEffect, useState } from "react";
// import "./CrafterMaterial.css"
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import Header from "../Header";

// function CrafterMaterialPage() {
//   const [materials, setMaterials] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [checkoutItem, setCheckoutItem] = useState(null);
//   const [checkoutQuantity, setCheckoutQuantity] = useState(1);
//   const [address, setAddress] = useState("");
//   // const [orders, setOrders] = useState([]);

//   const currentUserId = sessionStorage.getItem("userId");

//   // Fetch materials and orders only ONCE
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchMaterials();
//       await fetchOrders();
//     };
//     fetchData();
//   }, []);

//   const fetchMaterials = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/material/all");
//       let mats = Array.isArray(res.data.allmaterial) ? res.data.allmaterial : [];
//       mats = mats.filter((m) => m && m._id); // safe filter
//       setMaterials(mats);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//       setMaterials([]);
//     }
//   };

//   // const fetchOrders = async () => {
//   //   try {
//   //     const res = await axios.get(
//   //       `http://localhost:5000/order/getbycrafter/${currentUserId}`
//   //     );
//   //     let fetchedOrders = Array.isArray(res.data.orders) ? res.data.orders : [];
//   //     setOrders(fetchedOrders);
//   //   } catch (err) {
//   //     console.error("Failed to fetch orders:", err);
//   //     toast.error("Failed to fetch orders!");
//   //   }
//   // };

//   const fetchOrders = async () => {
//   if (!currentUserId) return; // user not logged in

//   try {
//     const res = await axios.get(
//       `http://localhost:5000/order/getbycrafter/${currentUserId}`
//     );
//     setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
//   } catch (err) {
//     console.error("Failed to fetch orders:", err);
//     toast.error("Failed to fetch orders!");
//   }
// };

//   const addToCart = (material) => {
//     if (!material || !material._id) return;
//     if (cart.some((item) => item._id === material._id)) {
//       toast.warning("Already in cart!");
//       return;
//     }
//     setCart((prev) => [...prev, material]);
//     toast.success("Added to cart!");
//   };

//   const handleBuyNow = (material) => {
//     if (!material || !material._id) return;
//     setCheckoutItem(material);
//     setCheckoutQuantity(1);
//     setCheckoutOpen(true);
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.trim()) {
//       toast.error("Enter delivery address!");
//       return;
//     }

//     const itemsToOrder = checkoutItem ? [checkoutItem] : cart;
//     if (itemsToOrder.length === 0) {
//       toast.error("No item selected!");
//       return;
//     }

//     try {
//       const currentUser = JSON.parse(sessionStorage.getItem("current-user"));

//       for (let item of itemsToOrder) {
//         if (!item || !item._id) continue;
//         if (checkoutQuantity > item.quantity) {
//           toast.error(`Quantity exceeds available stock for ${item.title}`);
//           return;
//         }

//         await axios.post("http://localhost:5000/order/", {
//           buyer: currentUser._id,
//           materialId: item._id,
//           quantity: checkoutQuantity,
//           totalPrice: item.price * checkoutQuantity,
//           address,
//         });
//       }

//       toast.success("Order(s) placed successfully!");
//       setCart([]);
//       setCheckoutItem(null);
//       setCheckoutOpen(false);
//       setCheckoutQuantity(1);
//       setAddress("");
//       fetchOrders(); // fetch orders only
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.error || "Failed to place order!");
//     }
//   };

//   return<>
//       <ToastContainer />
//     <div className="material-page">
//       <Header />

//       <div
//         className="cart-icon"
//         onClick={() => {
//           setCheckoutItem(null);
//           setCheckoutQuantity(1);
//           setCheckoutOpen(true);
//         }}
//       >
//         🛒 <span>{cart.length}</span>
//       </div>

//       <h2>Available Materials</h2>
//       <div className="materials-grid">
//         {materials.length === 0 && <p>No materials available.</p>}
//         {materials.map((mat) =>
//           mat && mat._id ? (
//             <div key={mat._id} className="material-card">
//               <div className="img-wrap">
//                 {mat.images?.[0] ? (
//                   <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} />
//                 ) : (
//                   <div className="image-placeholder">No Image</div>
//                 )}
//               </div>
//               <div className="card-info">
//                 <h4>{mat.title}</h4>
//                 <p>{mat.description}</p>
//                 <small className="category">{mat.category}</small>
//                 <p>Price: ₹{mat.price}</p>
//                 <p>Available Stock: {mat.quantity}</p>
//               </div>
//               <div className="card-buttons">
//                 <button onClick={() => addToCart(mat)} className="add-to-cart-btn">
//                   🛒 Add to Cart
//                 </button>
//                 <button onClick={() => handleBuyNow(mat)} className="buy-now-btn">
//                   ⚡ Buy Now
//                 </button>
//               </div>
//             </div>
//           ) : null
//         )}
//       </div>

//       {checkoutOpen && (
//         <div className="checkout-modal">
//           <div className="checkout-card">
//             <h3>Checkout</h3>
//             {(checkoutItem || cart.length > 0) && (
//               <div className="checkout-item">
//                 <p>Product: {checkoutItem ? checkoutItem.title : cart[0].title}</p>
//                 <p>Price per item: ₹{checkoutItem ? checkoutItem.price : cart[0].price}</p>
//                 <label>Quantity: </label>
//                 <input
//                   type="number"
//                   min="1"
//                   max={checkoutItem ? checkoutItem.quantity : cart[0].quantity}
//                   value={checkoutQuantity}
//                   onChange={(e) => setCheckoutQuantity(Number(e.target.value))}
//                 />
//                 <p>
//                   Total Price: ₹
//                   {(checkoutItem ? checkoutItem.price : cart[0].price) * checkoutQuantity}
//                 </p>
//               </div>
//             )}
//             <textarea
//               placeholder="Enter Delivery Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             <div className="button-group">
//               <button onClick={handlePlaceOrder}>Place Order</button>
//               <button onClick={() => setCheckoutOpen(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* <h2>📦 My Orders</h2> */}
//       {/* {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div className="orders-section">
//           {orders.map(
//             (o) =>
//               o && o._id && (
//                 <div key={o._id} className="order-card">
//                   <div className="order-card-left">
//                     {o.material?.images?.[0] ? (
//                       <img
//                         src={`http://localhost:5000${o.material.images[0]}`}
//                         alt={o.material.title}
//                       />
//                     ) : (
//                       <div className="image-placeholder">No Image</div>
//                     )}
//                   </div>
//                   <div className="order-card-right">
//                     <h4>{o?.material?.title || "N/A"}</h4>
//                     <p>Quantity: {o.quantity}</p>
//                     <p>Total Price: ₹{o.totalPrice}</p>
//                     <p>Address: {o.address || "Not provided"}</p>
//                     <p className={`status ${o.status}`}>Status: {o.status}</p>
//                   </div>
//                 </div>
//               )
//           )}
//         </div>
//       )} */}
//     </div>
//   </>
// }

// export default CrafterMaterialPage;










// yha tak sb shi h 



// import React, { useEffect, useState } from "react";
// import "./Material.css";
// import Header from "../Header";

// function CrafterMaterialPage() {
//   const [materials, setMaterials] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [checkoutItem, setCheckoutItem] = useState(null);
//   const [address, setAddress] = useState("");
//   const [orders, setOrders] = useState([]);

//   const currentUserId = sessionStorage.getItem("userId"); // Crafter ID

//   // Initial fetch
//   useEffect(() => {
//     fetchMaterials();
//     fetchOrders();
//   }, []);

//   // Fetch all materials
//   const fetchMaterials = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/material/getall");
//       const data = await res.json();
//       setMaterials(data.allmaterial || []);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//     }
//   };

//   // Fetch orders for current crafter
//   const fetchOrders = async () => {
//     try {
//       // const res = await fetch(`http://localhost:5000/order/crafter/${currentUserId}`);
//       const res = await fetch(`http://localhost:5000/order/getbycrafter/${currentUserId}`);

//       const data = await res.json();
//       setOrders(data.orders || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   // Add to Cart
//   const addToCart = (material) => {
//     if (cart.some(item => item._id === material._id)) {
//       return alert("Already in cart!");
//     }
//     setCart(prev => [...prev, material]);
//   };

//   // Buy Now
//   const handleBuyNow = (material) => {
//     setCheckoutItem(material);
//     setCheckoutOpen(true);
//   };

//   // Place order using backend API
//   const handlePlaceOrder = async () => {
//     if (!address.trim()) return alert("Enter delivery address!");

//     const itemsToOrder = checkoutItem ? [checkoutItem] : cart;

//     try {
//       for (let item of itemsToOrder) {
//         await fetch("http://localhost:5000/order", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             materialId: item._id,
//             buyer: currentUserId,
//             seller: item.submittedById, // Crafter ID from material
//             quantity: 1,
//             totalPrice: item.price,
//             address
//           }),
//         });
//       }
//       alert("Order placed successfully!");
//       setCart([]);
//       setCheckoutItem(null);
//       setCheckoutOpen(false);
//       setAddress("");
//       fetchOrders();
//     } catch (err) {
//       console.error(err);
//       alert("Error placing order!");
//     }
//   };

//   return (
//     <div className="material-page">
//       <Header />

//       {/* Materials Grid */}
//       <h2>Available Materials</h2>
//       <div className="materials-grid">
//         {materials.length === 0 && <p>No materials available.</p>}
//         {materials.map(mat => (
//           <div key={mat._id} className="material-card">
//             <div className="img-wrap">
//               {mat.images?.[0] ? (
//                 <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} />
//               ) : (
//                 <div className="image-placeholder">No Image</div>
//               )}
//             </div>
//             <div className="card-info">
//               <h4>{mat.title}</h4>
//               <p>{mat.description}</p>
//               <small className="category">{mat.category}</small>
//               <p>Price: ₹{mat.price}</p>
//               <p>Added by: <strong>{mat.submittedBy}</strong></p>
//             </div>

//             {/* Buttons */}
//             <div className="card-buttons">
//               <button onClick={() => addToCart(mat)} className="add-to-cart-btn">
//                 🛒 Add to Cart
//               </button>
//               <button onClick={() => handleBuyNow(mat)} className="buy-now-btn">
//                 ⚡ Buy Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart Box */}
//       {cart.length > 0 && (
//         <div className="cart-box">
//           <h3>🛒 My Cart ({cart.length})</h3>
//           {cart.map(item => (
//             <div key={item._id} className="cart-item">
//               <p>{item.title} - ₹{item.price}</p>
//             </div>
//           ))}
//           <button onClick={() => { setCheckoutItem(null); setCheckoutOpen(true); }}>
//             Proceed to Checkout
//           </button>
//         </div>
//       )}

//       {/* Checkout Modal */}
//       {checkoutOpen && (
//         <div className="checkout-modal">
//           <div className="checkout-card">
//             <h3>Checkout</h3>
//             {checkoutItem ? (
//               <>
//                 <p>Product: {checkoutItem.title}</p>
//                 <p>Price: ₹{checkoutItem.price}</p>
//               </>
//             ) : (
//               cart.map((item, idx) => (
//                 <div key={idx}><p>{item.title} - ₹{item.price}</p></div>
//               ))
//             )}
//             <textarea
//               placeholder="Enter Delivery Address"
//               value={address}
//               onChange={e => setAddress(e.target.value)}
//             />
//             <button onClick={handlePlaceOrder}>Place Order</button>
//             <button onClick={() => setCheckoutOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* Orders Section */}
//       <h2>📦 My Orders</h2>
//       {orders.length === 0 ? <p>No orders yet.</p> :
//         <div className="orders-section">
//           {orders.map(o => (
//             <div key={o._id} className="order-card">
//               <p>Material: {o.material?.title}</p>
//               <p>Quantity: {o.quantity}</p>
//               <p>Total Price: ₹{o.totalPrice}</p>
//               <p>Address: {o.address || "Not provided"}</p>
//               <p>Status: {o.status}</p>
//             </div>
//           ))}
//         </div>
//       }
//     </div>
//   );
// }

// export default CrafterMaterialPage;
