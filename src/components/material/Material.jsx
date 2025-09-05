import React, { useEffect, useState } from "react";
import "./Material.css";
import Header from "../Header";

function Material() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    tags: "",
    submittedBy: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [address, setAddress] = useState("");
  const [userRole, setUserRole] = useState(""); // buyer or crafter
  const [orders, setOrders] = useState([]);
  const currentUserId = sessionStorage.getItem("userId"); // crafter's id

  const categories = [
    "Plastic",
    "Paper",
    "Fabric",
    "Metal",
    "Glass",
    "Cardboard",
    "Other",
  ];

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setUserRole(role);
    fetchMaterials();
    fetchUsers();
    fetchOrders();
  }, []);

  // Fetch all materials
  const fetchMaterials = async () => {
    try {
      const res = await fetch("http://localhost:5000/material/getall");
      const data = await res.json();
      setMaterials(data.allmaterial || []);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
    }
  };

  // Fetch all users (for submittedBy field)
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/getall");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.allUsers || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Fetch orders for crafter
  const fetchOrders = async () => {
    if (userRole !== "crafter") return;
    try {
      const res = await fetch(
        `http://localhost:5000/order/getbycrafter/${currentUserId}`
      );
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new material (buyer only)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRole !== "buyer") {
      alert("Only buyers can post materials!");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (selectedImage) formData.append("image", selectedImage);

    try {
      await fetch("http://localhost:5000/material/create", {
        method: "POST",
        body: formData,
      });
      setForm({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        tags: "",
        submittedBy: "",
      });
      setSelectedImage(null);
      setShowForm(false);
      setNotification(true);
      fetchMaterials();
      setTimeout(() => setNotification(false), 3000);
    } catch (err) {
      console.error("Failed to submit material:", err);
    }
  };

  // Open checkout modal for crafter
  const handleBuyNow = (material) => {
    if (userRole !== "crafter") {
      alert("Only crafters can buy materials!");
      return;
    }
    setCheckoutItem(material);
    setCheckoutOpen(true);
  };

  // Place order (crafter)
  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId: checkoutItem._id,
          crafterId: currentUserId,
          address,
        }),
      });
      const data = await res.json();

      if (data.success) {
        // ✨ Instant UI update without waiting for fetchOrders
        const newOrder = {
          _id: data.order?._id || Date.now(),
          materialId: checkoutItem,
          address,
          status: "Pending",
        };
        setOrders((prev) => [newOrder, ...prev]);

        alert(`Order placed successfully for ${checkoutItem.title}!`);
        setCheckoutOpen(false);
        setCheckoutItem(null);
        setAddress("");
      } else {
        alert("Failed to place order!");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order!");
    }
  };

  return (
    <div className="material-page">
      <Header />

      {/* Buyer: Add Material Button */}
      {userRole === "buyer" && (
        <button
          className="add-material-btn"
          onClick={() => setShowForm(true)}
        >
          ➕ Add Material
        </button>
      )}

      {notification && (
        <div className="notification">Material added successfully!</div>
      )}

      {/* Buyer Material Form */}
      {showForm && userRole === "buyer" && (
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <input
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
            />
            <input
              name="submittedBy"
              placeholder="Submitted By"
              value={form.submittedBy}
              onChange={handleChange}
              list="usersList"
              required
            />
            <datalist id="usersList">
              {users.map((user) => (
                <option key={user._id} value={user.name} data-id={user._id} />
              ))}
            </datalist>
            <button type="submit">🚀 Post</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Materials Grid */}
      <div className="materials-grid">
        {materials.map((mat) => (
          <div key={mat._id} className="material-card">
            <div className="img-wrap">
              {mat.images?.[0] ? (
                <img
                  src={`http://localhost:5000${mat.images[0]}`}
                  alt={mat.title}
                />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
              <span className="price-tag">₹{mat.price || 0}</span>
            </div>
            <div className="card-info">
              <h4>{mat.title}</h4>
              <p>{mat.description}</p>
              <small className="category">{mat.category}</small>
            </div>

            {/* Only Crafter can see Buy Now */}
            {userRole === "crafter" && (
              <button
                className="buy-now-btn"
                onClick={() => handleBuyNow(mat)}
              >
                ⚡ Buy Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="checkout-modal">
          <div className="checkout-card">
            <h3>Checkout</h3>
            <p>
              <strong>Product:</strong> {checkoutItem.title}
            </p>
            <p>
              <strong>Price:</strong> ₹{checkoutItem.price}
            </p>
            <textarea
              placeholder="Enter Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <button onClick={handlePlaceOrder}>Place Order</button>
            <button onClick={() => setCheckoutOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Crafter Orders */}
      {userRole === "crafter" && orders.length > 0 && (
        <div className="orders-section">
          <h3>🛒 My Orders</h3>
          {orders.map((o) => (
            <div key={o._id} className="order-card">
              <h4>{o.materialId.title}</h4>
              <p>
                <strong>Price:</strong> ₹{o.materialId.price}
              </p>
              <p>
                <strong>Address:</strong> {o.address}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      o.status === "Pending"
                        ? "orange"
                        : o.status === "Completed"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {o.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Material;










// import React, { useEffect, useState } from "react";
// import "./Material.css";
// import Header from "../Header";

// function Material() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: "",
//     tags: "",
//     submittedBy: "",
//   });

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [materials, setMaterials] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [notification, setNotification] = useState(false);
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [checkoutItem, setCheckoutItem] = useState(null);
//   const [address, setAddress] = useState("");
//   const [userRole, setUserRole] = useState(""); // buyer or crafter

//   const categories = [
//     "Plastic",
//     "Paper",
//     "Fabric",
//     "Metal",
//     "Glass",
//     "Cardboard",
//     "Other",
//   ];

//   useEffect(() => {
//     const role = sessionStorage.getItem("role"); // Set role after login
//     setUserRole(role);
//     fetchMaterials();
//     fetchUsers();
//   }, []);

//   const fetchMaterials = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/material/getall");
//       const data = await res.json();
//       setMaterials(data.allmaterial || []);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/user/getall");
//       const data = await res.json();
//       setUsers(Array.isArray(data) ? data : data.allUsers || []);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (userRole !== "buyer") {
//       alert("Only buyers can post materials!");
//       return;
//     }

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) =>
//       formData.append(key, value)
//     );
//     if (selectedImage) formData.append("image", selectedImage);

//     try {
//       await fetch("http://localhost:5000/material/create", {
//         method: "POST",
//         body: formData,
//       });
//       setForm({
//         title: "",
//         description: "",
//         price: "",
//         quantity: "",
//         category: "",
//         tags: "",
//         submittedBy: "",
//       });
//       setSelectedImage(null);
//       setShowForm(false);
//       setNotification(true);
//       fetchMaterials();
//       setTimeout(() => setNotification(false), 3000);
//     } catch (err) {
//       console.error("Failed to submit material:", err);
//     }
//   };

//   const handleBuyNow = (material) => {
//     if (userRole !== "crafter") {
//       alert("Only crafters can buy materials!");
//       return;
//     }
//     setCheckoutItem(material);
//     setCheckoutOpen(true);
//   };

//   const handlePlaceOrder = () => {
//     if (!address.trim()) {
//       alert("Please enter delivery address!");
//       return;
//     }
//     alert(`Order placed successfully for ${checkoutItem.title}!`);
//     setCheckoutOpen(false);
//     setCheckoutItem(null);
//     setAddress("");
//   };

//   return (
//     <div className="material-page">
//       <Header />

//       {/* Buyer can add new material */}
//       {userRole === "buyer" && (
//         <button
//           className="add-material-btn"
//           onClick={() => setShowForm(true)}
//         >
//           ➕ Add Material
//         </button>
//       )}

//       {notification && (
//         <div className="notification">Material added successfully!</div>
//       )}

//       {/* Buyer Material Form */}
//       {showForm && userRole === "buyer" && (
//         <div className="form-card">
//           <form onSubmit={handleSubmit}>
//             <input
//               name="title"
//               placeholder="Title"
//               value={form.title}
//               onChange={handleChange}
//               required
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={form.description}
//               onChange={handleChange}
//               required
//             />
//             <input
//               name="price"
//               type="number"
//               placeholder="Price (₹)"
//               value={form.price}
//               onChange={handleChange}
//               required
//             />
//             <input
//               name="quantity"
//               type="number"
//               placeholder="Quantity"
//               value={form.quantity}
//               onChange={handleChange}
//               required
//             />
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Category --</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setSelectedImage(e.target.files[0])}
//             />
//             <input
//               name="tags"
//               placeholder="Tags (comma separated)"
//               value={form.tags}
//               onChange={handleChange}
//             />
//             <input
//               name="submittedBy"
//               placeholder="Submitted By"
//               value={form.submittedBy}
//               onChange={handleChange}
//               list="usersList"
//               required
//             />
//             <datalist id="usersList">
//               {users.map((user) => (
//                 <option key={user._id} value={user.name} data-id={user._id} />
//               ))}
//             </datalist>
//             <button type="submit">🚀 Post</button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="cancel-btn"
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Materials Grid */}
//       <div className="materials-grid">
//         {materials.map((mat) => (
//           <div key={mat._id} className="material-card">
//             <div className="img-wrap">
//               {mat.images?.[0] ? (
//                 <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} />
//               ) : (
//                 <div className="image-placeholder">No Image</div>
//               )}
//               <span className="price-tag">₹{mat.price || 0}</span>
//             </div>
//             <div className="card-info">
//               <h4>{mat.title}</h4>
//               <p>{mat.description}</p>
//               <small className="category">{mat.category}</small>
//             </div>

//             {/* Only Crafter can see Buy Now */}
//             {userRole === "crafter" && (
//               <button className="buy-now-btn" onClick={() => handleBuyNow(mat)}>
//                 ⚡ Buy Now
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Checkout Modal for Crafter */}
//       {checkoutOpen && (
//         <div className="checkout-modal">
//           <div className="checkout-card">
//             <h3>Checkout</h3>
//             <p>Product: {checkoutItem.title}</p>
//             <p>Price: ₹{checkoutItem.price}</p>
//             <textarea
//               placeholder="Enter Delivery Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             ></textarea>
//             <button onClick={handlePlaceOrder}>Place Order</button>
//             <button onClick={() => setCheckoutOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Material;
















// import React, { useEffect, useState } from "react";
// import "./Material.css";
// import Header from '../Header';

// function Material() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: "",
//     tags: "",
//     submittedBy: ""
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [materials, setMaterials] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [notification, setNotification] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [sideCartOpen, setSideCartOpen] = useState(false);

//   const categories = ["Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"];

//   const fetchMaterials = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/material/getall");
//       const data = await res.json();
//       setMaterials(data.allmaterial || []);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/user/getall");
//       const data = await res.json();
//       setUsers(Array.isArray(data) ? data : data.allUsers || []);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMaterials();
//     fetchUsers();
//   }, []);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//     if (selectedImage) formData.append("image", selectedImage);

//     try {
//       await fetch("http://localhost:5000/material/create", {
//         method: "POST",
//         body: formData
//       });
//       setForm({
//         title: "",
//         description: "",
//         price: "",
//         quantity: "",
//         category: "",
//         tags: "",
//         submittedBy: ""
//       });
//       setSelectedImage(null);
//       setShowForm(false);
//       setNotification(true);
//       fetchMaterials();
//       setTimeout(() => setNotification(false), 3000);
//     } catch (err) {
//       console.error("Failed to submit material:", err);
//     }
//   };

//   const addToCart = (material) => {
//     setCart(prev => {
//       const exist = prev.find(item => item._id === material._id);
//       if (exist) return prev;
//       return [...prev, material];
//     });
//     setSideCartOpen(true);
//   };

//   const removeFromCart = (id) => {
//     setCart(prev => prev.filter(item => item._id !== id));
//   };

//   return (
//     <div className="material-page">
//       <Header/>

//       <button className="add-material-btn" onClick={() => setShowForm(true)}>➕ Add Material</button>

//       {notification && <div className="notification">Material added successfully!</div>}

//       {showForm && (
//         <div className="form-card">
//           <form onSubmit={handleSubmit}>
//             <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//             <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
//             <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} required />
//             <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
//             <select name="category" value={form.category} onChange={handleChange} required>
//               <option value="">-- Select Category --</option>
//               {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//             </select>
//             <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
//             <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
//             <input 
//               name="submittedBy" 
//               placeholder="Submitted By" 
//               value={form.submittedBy} 
//               onChange={handleChange} 
//               list="usersList" 
//               required 
//             />
//             <datalist id="usersList">
//               {users.map(user => <option key={user._id} value={user.name} data-id={user._id} />)}
//             </datalist>
//             <button type="submit">🚀 Post</button>
//             <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
//           </form>
//         </div>
//       )}

//       <div className="materials-grid">
//         {materials.map(mat => (
//           <div key={mat._id} className="material-card">
//             <div className="img-wrap">
//               {mat.images?.[0] ? (
//                 <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} />
//               ) : (
//                 <div className="image-placeholder">No Image</div>
//               )}
//               <span className="price-tag">₹{mat.price || 0}</span>
//             </div>
//             <div className="card-info">
//               <h4>{mat.title}</h4>
//               <p>{mat.description}</p>
//               <small className="category">{mat.category}</small>
//             </div>
//             <button className="add-cart-btn" onClick={() => addToCart(mat)}>🛒 Add</button>
//           </div>
//         ))}
//       </div>

//       <button className="floating-cart-btn" onClick={() => setSideCartOpen(prev => !prev)}>🛒<span className="cart-count">{cart.length}</span></button>

//       <div className={`side-cart ${sideCartOpen ? "open" : ""}`}>
//         <h3>Cart</h3>
//         <ul>
//           {cart.map(item => (
//             <li key={item._id}>
//               {item.title} - ₹{item.price || 0}
//               <button onClick={() => removeFromCart(item._id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Material;




// import React, { useEffect, useState } from "react";
// import "./Material.css";
// import Header from '../Header';

// <Header/>
// function Material() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: "",
//     tags: "",
//     submittedBy: ""
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [materials, setMaterials] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [notification, setNotification] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [sideCartOpen, setSideCartOpen] = useState(false);

//   const categories = ["Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"];

//   // Fetch all materials
//   const fetchMaterials = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/material/getall");
//       const data = await res.json();
//       setMaterials(data.allmaterial || []);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//     }
//   };

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/user/getall");
//       const data = await res.json();
//       setUsers(Array.isArray(data) ? data : data.allUsers || []);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMaterials();
//     fetchUsers();
//   }, []);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//     if (selectedImage) formData.append("image", selectedImage);

//     try {
//       await fetch("http://localhost:3000/material/create", {
//         method: "POST",
//         body: formData
//       });
//       setForm({
//         title: "",
//         description: "",
//         price: "",
//         quantity: "",
//         category: "",
//         tags: "",
//         submittedBy: ""
//       });
//       setSelectedImage(null);
//       setShowForm(false);
//       setNotification(true);
//       fetchMaterials();
//       setTimeout(() => setNotification(false), 3000);
//     } catch (err) {
//       console.error("Failed to submit material:", err);
//     }
//   };

//   const addToCart = (material) => {
//     setCart(prev => {
//       const exist = prev.find(item => item._id === material._id);
//       if (exist) return prev;
//       return [...prev, material];
//     });
//     setSideCartOpen(true);
//   };

//   const removeFromCart = (id) => {
//     setCart(prev => prev.filter(item => item._id !== id));
//   };

//   return (
//     <div className="material-page">
//       <button className="add-material-btn" onClick={() => setShowForm(true)}>➕ Add Material</button>

//       {notification && <div className="notification">Material added successfully!</div>}

//       {showForm && (
//         <div className="form-card">
//           <form onSubmit={handleSubmit}>
//             <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//             <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
//             <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} required />
//             <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
//             <select name="category" value={form.category} onChange={handleChange} required>
//               <option value="">-- Select Category --</option>
//               {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//             </select>
//             <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
//             <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
//            <input 
//   name="submittedBy" 
//   placeholder="Submitted By" 
//   value={form.submittedBy} 
//   onChange={handleChange} 
//   list="usersList" 
//   required 
// />
// <datalist id="usersList">
//   {users.map(user => <option key={user._id} value={user.name} data-id={user._id} />)}
// </datalist>
//             <button type="submit">🚀 Post</button>
//             <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
//           </form>
//         </div>
//       )}

//       <div className="materials-grid">
//         {materials.map(mat => (
//           <div key={mat._id} className="material-card">
//             <div className="img-wrap">
//               {mat.images?.[0] ? (
//                 <img src={`http://localhost:3000${mat.images[0]}`} alt={mat.title} />
//               ) : (
//                 <div className="image-placeholder">No Image</div>
//               )}
//               <span className="price-tag">₹{mat.price || 0}</span>
//             </div>
//             <div className="card-info">
//               <h4>{mat.title}</h4>
//               <p>{mat.description}</p>
//               <small className="category">{mat.category}</small>
//             </div>
//             <button className="add-cart-btn" onClick={() => addToCart(mat)}>🛒 Add</button>
//           </div>
//         ))}
//       </div>

//       <button className="floating-cart-btn" onClick={() => setSideCartOpen(prev => !prev)}>🛒<span className="cart-count">{cart.length}</span></button>

//       <div className={`side-cart ${sideCartOpen ? "open" : ""}`}>
//         <h3>Cart</h3>
//         <ul>
//           {cart.map(item => (
//             <li key={item._id}>
//               {item.title} - ₹{item.price || 0}
//               <button onClick={() => removeFromCart(item._id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Material;












