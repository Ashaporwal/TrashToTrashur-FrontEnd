import React, { useEffect, useState } from "react";
import "./Material.css";
import Header from '../Header';

function Material() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    tags: "",
    submittedBy: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(false);
  const [cart, setCart] = useState([]);
  const [sideCartOpen, setSideCartOpen] = useState(false);

  const categories = ["Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"];

  const fetchMaterials = async () => {
    try {
      const res = await fetch("http://localhost:3000/material/getall");
      const data = await res.json();
      setMaterials(data.allmaterial || []);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/getall");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.allUsers || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchUsers();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (selectedImage) formData.append("image", selectedImage);

    try {
      await fetch("http://localhost:3000/material/create", {
        method: "POST",
        body: formData
      });
      setForm({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        tags: "",
        submittedBy: ""
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

  const addToCart = (material) => {
    setCart(prev => {
      const exist = prev.find(item => item._id === material._id);
      if (exist) return prev;
      return [...prev, material];
    });
    setSideCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div className="material-page">
      <Header/>

      <button className="add-material-btn" onClick={() => setShowForm(true)}>➕ Add Material</button>

      {notification && <div className="notification">Material added successfully!</div>}

      {showForm && (
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} required />
            <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
            <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
            <input 
              name="submittedBy" 
              placeholder="Submitted By" 
              value={form.submittedBy} 
              onChange={handleChange} 
              list="usersList" 
              required 
            />
            <datalist id="usersList">
              {users.map(user => <option key={user._id} value={user.name} data-id={user._id} />)}
            </datalist>
            <button type="submit">🚀 Post</button>
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
          </form>
        </div>
      )}

      <div className="materials-grid">
        {materials.map(mat => (
          <div key={mat._id} className="material-card">
            <div className="img-wrap">
              {mat.images?.[0] ? (
                <img src={`http://localhost:3000${mat.images[0]}`} alt={mat.title} />
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
            <button className="add-cart-btn" onClick={() => addToCart(mat)}>🛒 Add</button>
          </div>
        ))}
      </div>

      <button className="floating-cart-btn" onClick={() => setSideCartOpen(prev => !prev)}>🛒<span className="cart-count">{cart.length}</span></button>

      <div className={`side-cart ${sideCartOpen ? "open" : ""}`}>
        <h3>Cart</h3>
        <ul>
          {cart.map(item => (
            <li key={item._id}>
              {item.title} - ₹{item.price || 0}
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Material;




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












