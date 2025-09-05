import React, { useState, useEffect } from "react";
import "./BuyerMaterial.css";
import Header from "../Header";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function BuyerMaterialPage() {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    tags: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"];
  const role = sessionStorage.getItem("role");
  const currentUser = JSON.parse(sessionStorage.getItem("current-user"));

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/material/getbybuyer/${currentUser._id}`);
      setMaterials(res.data.allmaterial || []); // allmaterial is from your backend
      console.log(res.data);
// setMaterials(res.data.allmaterial || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch materials!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { title, description, price, quantity, category, tags } = form;
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("tags", tags);
    if (selectedImage) formData.append("image", selectedImage);
    formData.append("submittedBy", currentUser._id);

    try {
      await axios.post("http://localhost:5000/material/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(formData);
      toast.success("Material Added Successfully!");
      setForm({ title: "", description: "", price: "", quantity: "", category: "", tags: "" });
      setSelectedImage(null);
      setShowForm(false);
      fetchMaterials();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add material!");
    }
  };

  return (
    <div className="material-page">
      <ToastContainer />
      <Header />

      <h2 className="page-title">My Materials</h2>

      {role === "buyer" && (
        <button className="add-material-btn" onClick={() => setShowForm(true)}>➕ Add Material</button>
      )}

      {showForm && role === "buyer" && (
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
            <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
            <input name="tags" placeholder="Tags" value={form.tags} onChange={handleChange} />
            <button type="submit">🚀 Post</button>
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
          </form>
        </div>
      )}

      <div className="materials-grid">
        {materials.map(mat => (
          <div key={mat._id} className="material-card">
            <div className="img-wrap">
              {mat.images?.[0] ? <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} /> : <div className="image-placeholder">No Image</div>}
            </div>
            <div className="card-info">
              <h4>{mat.title}</h4>
              <p>{mat.description}</p>
              <small className="category">{mat.category}</small>
              <p>Price: ₹{mat.price}</p>
              <p>Quantity{mat.quantity}</p>
              {/* <p>Available Stock: {mat.remainingStock}</p> */}
              {/* <p>Total Sold: {mat.soldQuantity}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerMaterialPage;








// import React, { useState, useEffect } from "react";
// import "./BuyerMaterial.css";
// import Header from "../Header";

// function BuyerMaterialPage() {
//   const [materials, setMaterials] = useState([]);
//   const [users, setUsers] = useState([]);
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
//   const [showForm, setShowForm] = useState(false);
//   const [notification, setNotification] = useState(false);

//   const categories = ["Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"];

//   useEffect(() => {
//     fetchMaterials();
//     fetchUsers();
//   }, []);

//   const fetchMaterials = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/material/getall");
//       const data = await res.json();
//       setMaterials(data.allmaterial || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/user/getall");
//       const data = await res.json();
//       setUsers(data.allUsers || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//     if (selectedImage) formData.append("image", selectedImage);

//     try {
//       await fetch("http://localhost:5000/material/create", { method: "POST", body: formData });
//       setForm({ title: "", description: "", price: "", quantity: "", category: "", tags: "", submittedBy: "" });
//       setSelectedImage(null);
//       setShowForm(false);
//       setNotification(true);
//       fetchMaterials();
//       setTimeout(() => setNotification(false), 3000);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="material-page">
//       <Header />
//       <button onClick={() => setShowForm(true)} className="add-material-btn">➕ Add Material</button>
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
//             <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
//             <input name="tags" placeholder="Tags" value={form.tags} onChange={handleChange} />
//             <input name="submittedBy" placeholder="Submitted By" value={form.submittedBy} onChange={handleChange} list="usersList" required />
//             <datalist id="usersList">{users.map(u => <option key={u._id} value={u.name} />)}</datalist>
//             <button type="submit">🚀 Post</button>
//             <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
//           </form>
//         </div>
//       )}

//       <div className="materials-grid">
//         {materials.map(mat => (
//           <div key={mat._id} className="material-card">
//             <div className="img-wrap">
//               {mat.images?.[0] ? <img src={`http://localhost:5000${mat.images[0]}`} alt={mat.title} /> : <div className="image-placeholder">No Image</div>}
//             </div>
//             <div className="card-info">
//               <h4>{mat.title}</h4>
//               <p>{mat.description}</p>
//               <small className="category">{mat.category}</small>
//               <p className="price-text">Price: ₹{mat.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BuyerMaterialPage;
