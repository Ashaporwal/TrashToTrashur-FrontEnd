import React, { useState } from "react";
import axios from "axios";

function TutorialForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    submittedBy: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category || !formData.tags || !formData.submittedBy || !imageFile) {
      setMessage("Please fill in all fields and upload an image.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    form.append("image", imageFile);

    try {
      const res = await axios.post( "https://trashtotrashur-backend.onrender.com/tutorials/upload", form);
      console.log("Tutorial uploaded:", res.data);
      setMessage("Tutorial uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        tags: "",
        submittedBy: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading tutorial:", error);
      setMessage("Failed to upload tutorial.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", background: "#f4f4f4", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Upload Tutorial</h2>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {["title", "description", "category", "tags", "submittedBy"].map((field) => (
          <div key={field} style={{ marginBottom: "1rem" }}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        ))}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ display: "block", marginTop: "5px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default TutorialForm;
