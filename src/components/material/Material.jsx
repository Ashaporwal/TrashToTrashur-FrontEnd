import React, { useEffect, useState } from "react";
import "./Material.css";

function Material() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    tags: "",
    submittedBy: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [materialsList, setMaterialsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [craftersList, setCraftersList] = useState([]);

  const categories = ["All", "Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"];


  const loadMaterials = async () => {
    try {
      const response = await fetch("https://trashtotrashur-backend.onrender.com/material/getall");
      const data = await response.json();
      setMaterialsList(data.allmaterial || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };


  const loadCrafters = async () => {
    try {
      const response = await fetch("https://trashtotrashur-backend.onrender.com/user/crafters");
      const data = await response.json();
      setCraftersList(data || []);
    } catch (error) {
      console.error("Error fetching crafters:", error);
    }
  };

  useEffect(() => {
    loadMaterials();
    loadCrafters();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
    dataToSend.append("status", "pending");

    if (selectedImage) {
      dataToSend.append("image", selectedImage);
    }

    try {
      await fetch("https://trashtotrashur-backend.onrender.com/material/create", {
        method: "POST",
        body: dataToSend
      });
      setFormData({ title: "", description: "", price: "", quantity: "", category: "", tags: "", submittedBy: "" });
      setSelectedImage(null);
      loadMaterials();
    } catch (error) {
      console.error("Error submitting material:", error);
    }
  };

  return (
    <div className="material-page">

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 Search materials..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="filter-pills">
          {categories.map(cat => (
            <span
              key={cat}
              className={`pill ${categoryFilter === cat ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Add Material Form */}
      <div className="form-card">
        <h3>➕ Add Material</h3>
        <form onSubmit={handleFormSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
          <input name="price" type="number" placeholder="Price (₹)" value={formData.price} onChange={handleInputChange} required />
          <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} required />
          <select name="category" value={formData.category} onChange={handleInputChange} required>
            <option value="">-- Select Category --</option>
            {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
          <input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleInputChange} />
          <input
            name="submittedBy"
            placeholder="Submitted By"
            value={formData.submittedBy}
            onChange={handleInputChange}
            list="craftersList"
            required
          />
          <datalist id="craftersList">
            {craftersList.map(c => <option key={c._id} value={c.name} />)}
          </datalist>
          <button type="submit">🚀 Post</button>
        </form>
      </div>

      {/* Material Cards */}
      <div className="materials-grid">
        {materialsList
          .filter(mat =>
            (categoryFilter === "All" || mat.category === categoryFilter) &&
            mat.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(mat => (
            <div key={mat._id} className="material-card">
              <div className="img-wrap">
                {mat.images?.[0] ? (
                  <img src={`https://trashtotrashur-backend.onrender.com/${mat.images[0]}`} alt={mat.title} />
                ) : (
                  <div className="image-placeholder">No Image</div>
                )}
                <span className="price-tag">₹{mat.price}</span>
                {/* <span className={`status-badge ${mat.status}`}>{mat.status}</span> */}

                {/* Add to Cart button */}
                {/* <button className="add-to-cart-btn">Add to Cart</button> */}
              </div>
              <div className="card-info">
                <h4>{mat.title}</h4>
                <p>{mat.description}</p>
                <small className="category">{mat.category}</small>
              </div>
            </div>
          ))}

         <button
  className="floating-cart-btn"
  onClick={() => setIsCartOpen(true)}
>
  <span>🛒</span>
  <span className="cart-count">1</span>
</button>
</div>
</div>
  );
}

export default Material;





// import React, { useEffect, useState } from "react";
// import "./Material.css";

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
//   const [imageFile, setImageFile] = useState(null);
//   const [materials, setMaterials] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [crafters, setCrafters] = useState([]); // For autocomplete suggestions

//   // Fetch all materials
//   const fetchMaterials = async () => {
//     try {
//       const res = await fetch("https://trashtotrashur-backend.onrender.com/material/getall");
//       const data = await res.json();
//       setMaterials(data.allmaterial || []);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//     }
//   };

//   // Fetch all crafters for autocomplete
//   const fetchCrafters = async () => {
//     try {
//       const res = await fetch("https://trashtotrashur-backend.onrender.com/user/crafters");
//       const data = await res.json();
//       setCrafters(data || []);
//     } catch (err) {
//       console.error("Failed to fetch crafters:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMaterials();
//     fetchCrafters();
//   }, []);

//   // Handle form input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([k, v]) => formData.append(k, v));
//     formData.append("status", "pending");
//     if (imageFile) formData.append("image", imageFile);

//     try {
//       const res = await fetch("https://trashtotrashur-backend.onrender.com/material/create", {
//         method: "POST",
//         body: formData
//       });
//       await res.json();
//       setForm({ title: "", description: "", price: "", quantity: "", category: "", tags: "", submittedBy: "" });
//       setImageFile(null);
//       fetchMaterials();
//     } catch (err) {
//       console.error("Error submitting material:", err);
//     }
//   };

//   const categories = ["All", "Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"];

//   return (
//     <div className="material-page">
//       {/* Search + Filters */}
//       <div className="search-filter">
//         <input
//           type="text"
//           placeholder="🔍 Search materials..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <div className="filter-pills">
//           {categories.map((cat) => (
//             <span
//               key={cat}
//               className={`pill ${filter === cat ? "active" : ""}`}
//               onClick={() => setFilter(cat)}
//             >
//               {cat}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Form */}
//       <div className="form-card">
//         <h3>➕ Add Material</h3>
//         <form onSubmit={handleSubmit}>
//           <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//           <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
//           <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} required />
//           <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
//           <select name="category" value={form.category} onChange={handleChange} required>
//             <option value="">-- Select Category --</option>
//             {categories.slice(1).map((c) => (
//               <option key={c} value={c}>{c}</option>
//             ))}
//           </select>
//           <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
//           <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
          
//           {/* Autocomplete for Submitted By */}
//           <input
//             name="submittedBy"
//             placeholder="Submitted By"
//             value={form.submittedBy}
//             onChange={handleChange}
//             list="craftersList"
//             required
//           />
//           <datalist id="craftersList">
//             {crafters.map((c) => (
//               <option key={c._id} value={c.name} />
//             ))}
//           </datalist>

//           <button type="submit">🚀 Post</button>
//         </form>
//       </div>

//       {/* Materials */}
//       <div className="materials-grid">
//         {materials
//           .filter((m) => (filter === "All" || m.category === filter) && m.title.toLowerCase().includes(search.toLowerCase()))
//           .map((mat) => (
//             <div key={mat._id} className="material-card">
//               {mat.images?.[0] && (
//                 <div className="img-wrap">
//                   <img src={`https://trashtotrashur-backend.onrender.com/${mat.images[0]}`} alt={mat.title} />
//                   <span className="price-tag">₹{mat.price}</span>
//                   <span className={`status-badge ${mat.status}`}>{mat.status}</span>
//                 </div>
//               )}
//               <div className="card-info">
//                 <h4>{mat.title}</h4>
//                 <small>{mat.category}</small>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default Material;











// import React, { useEffect, useState } from "react";
// import "./Material.css";

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

//   const [imageFile, setImageFile] = useState(null);
//   const [materials, setMaterials] = useState([]);

//   // Fetch all materials from the server
//   const fetchMaterials = async () => {
//     try {
//       const res = await fetch("https://trashtotrashur-backend.onrender.com/material/getall");
//       const data = await res.json();
//       setMaterials(data.allmaterial || []);
//     } catch (err) {
//       console.error("Failed to fetch materials:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMaterials();
//   }, []);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     formData.append("status", "pending");
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     try {
//       const res = await fetch("https://trashtotrashur-backend.onrender.com/material/create", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log("Server response:", data);

//       // Reset form & fetch updated list
//       setForm({
//         title: "",
//         description: "",
//         price: "",
//         quantity: "",
//         category: "",
//         tags: "",
//         submittedBy: ""
//       });
//       setImageFile(null);
//       fetchMaterials();
//     } catch (err) {
//       console.error("Error submitting material:", err);
//     }
//   };

//   return (
//     <div className="material-page">
//       {/* Material Form */}
//       <div className="form-section">
//         <h3>➕ Add Material</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             name="title"
//             placeholder="Title"
//             value={form.title}
//             onChange={handleChange}
//             required
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="price"
//             type="number"
//             placeholder="Price (₹)"
//             value={form.price}
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="quantity"
//             type="number"
//             placeholder="Quantity"
//             value={form.quantity}
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">-- Select Category --</option>
//             <option value="Plastic">Plastic</option>
//             <option value="Paper">Paper</option>
//             <option value="Fabric">Fabric</option>
//             <option value="Metal">Metal</option>
//             <option value="Glass">Glass</option>
//             <option value="Cardboard">Cardboard</option>
//             <option value="Other">Other</option>
//           </select>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files[0])}
//           />

//           <input
//             name="tags"
//             placeholder="Tags (comma separated)"
//             value={form.tags}
//             onChange={handleChange}
//           />

//           <input
//             name="submittedBy"
//             placeholder="Submitted By"
//             value={form.submittedBy}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit" className="post-btn">🚀 Post</button>
//         </form>
//       </div>

//       {/* Material List */}
//       <div className="materials-section">
//         <h3>📋 All Materials</h3>
//         <div className="materials-list">
//           {materials.map((mat) => (
//             <div key={mat._id} className="material-card">
//               {mat.images?.[0] && (
//                 <img
//                   src={`https://trashtotrashur-backend.onrender.com/${mat.images[0]}`}
//                   alt={mat.title}
//                 />
//               )}
//               <h4>{mat.title}</h4>
//               <p>{mat.description}</p>
//               <small>📂 {mat.category}</small>
//               <div className={`status ${mat.status}`}>
//                 {mat.status === "approved" ? "✅ Approved" : "⏳ Pending"}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Material;
