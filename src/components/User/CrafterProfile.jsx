import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CrafterProfile.css";
import MyTutorials from "../createTutorial/MyTutorials" // ✅ MyTutorials import

function CrafterProfile() {
  const [crafter, setCrafter] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    bio: "",
    password: "",
  });
  const [profileFile, setProfileFile] = useState(null);

  const crafterId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchCrafter();
  }, [crafterId]);

  // fetch crafter details (sirf user data, tutorials alag component handle karega)
  const fetchCrafter = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${crafterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.crafter || res.data;
      console.log("Fetched User Data:", userData);

      setCrafter(userData);
      setFormData({ ...userData, password: "" });
    } catch (err) {
      console.error("Failed to fetch profile:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
  };


  const handleSave = async () => {
    try {
      const updateData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "profilePicture") {
          updateData.append(key, formData[key]);
        }
      });
      if (profileFile) updateData.append("profilePicture", profileFile);

      const res = await axios.put(
        `http://localhost:5000/user/update/${crafterId}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Profile updated successfully!");
      setEditMode(false);
      setProfileFile(null);


      fetchCrafter();
    } catch (err) {
      console.error("Failed to save profile:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };


  const handleCancel = () => {
    setFormData({ ...crafter, password: "" });
    setEditMode(false);
    setProfileFile(null);
  };

  if (!crafter) return <p className="loading-text">Loading your profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="photo-section">
          <img
            src={
              profileFile
                ? formData.profilePicture
                : crafter.profilePicture
                ? `http://localhost:5000/${crafter.profilePicture}`
                : "/placeholder.png"
            }
            alt={formData.name || "Profile"}
            className="profile-photo"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="file-input"
            />
          )}
        </div>

        <div className="info-section">
          {["name", "email", "contact", "bio", "password"].map((field) => (
            <div className="info-row" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              {editMode ? (
                field === "bio" ? (
                  <textarea
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "password"
                        ? "password"
                        : "text"
                    }
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                )
              ) : (
                <span>
                  {field === "password" ? "••••••" : formData[field]}
                </span>
              )}
            </div>
          ))}

          <div className="profile-buttons">
            {editMode ? (
              <>
                <button className="btn-save" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

 <div className="tutorials-section">
  <h2>Your Tutorials</h2>

  <MyTutorials crafterId={crafterId} />
</div>

    </div>
  );
}

export default CrafterProfile;
