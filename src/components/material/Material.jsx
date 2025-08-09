import React, { useEffect, useState } from "react";
import "./Material.css";

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

  const [imageFile, setImageFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  // Fetch all materials from the server
  const fetchMaterials = async () => {
    try {
      const res = await fetch("http://localhost:3000/material/getall");
      const data = await res.json();
      setMaterials(data.allmaterial || []);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("status", "pending");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch("http://localhost:3000/material/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Server response:", data);

      // Reset form & fetch updated list
      setForm({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        tags: "",
        submittedBy: ""
      });
      setImageFile(null);
      fetchMaterials();
    } catch (err) {
      console.error("Error submitting material:", err);
    }
  };

  return (
    <div className="material-page">
      {/* Material Form */}
      <div className="form-section">
        <h3>➕ Add Material</h3>
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
            <option value="Plastic">Plastic</option>
            <option value="Paper">Paper</option>
            <option value="Fabric">Fabric</option>
            <option value="Metal">Metal</option>
            <option value="Glass">Glass</option>
            <option value="Cardboard">Cardboard</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
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
            required
          />

          <button type="submit" className="post-btn">🚀 Post</button>
        </form>
      </div>

      {/* Material List */}
      <div className="materials-section">
        <h3>📋 All Materials</h3>
        <div className="materials-list">
          {materials.map((mat) => (
            <div key={mat._id} className="material-card">
              {mat.images?.[0] && (
                <img
                  src={`http://localhost:3000${mat.images[0]}`}
                  alt={mat.title}
                />
              )}
              <h4>{mat.title}</h4>
              <p>{mat.description}</p>
              <small>📂 {mat.category}</small>
              <div className={`status ${mat.status}`}>
                {mat.status === "approved" ? "✅ Approved" : "⏳ Pending"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Material;
