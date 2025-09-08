import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./UserProfile.css";

function BuyerProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    profilePicture: "",
  });
  const [profileFile, setProfileFile] = useState(null);

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.user || res.data;
      setUser(userData);
      setFormData({ ...userData });
    } catch (err) {
      console.error("Failed to fetch user:", err);
      alert("Session expired or error fetching profile.");
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
        if (key !== "profilePicture") updateData.append(key, formData[key]);
      });
      if (profileFile) updateData.append("profilePicture", profileFile);

      const res = await axios.put(
        `http://localhost:5000/user/update/${userId}`,
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
      setUser(res.data.updatedUser || res.data);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditMode(false);
    setProfileFile(null);
  };

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="photo-section">
          <img
            src={
              profileFile
                ? formData.profilePicture
                : user.profilePicture
                ? `http://localhost:5000${user.profilePicture}`
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
          {["name", "email", "contact", "address"].map((field) => (
            <div className="info-row" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              {editMode ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData[field]}</span>
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
    </div>
  );
}

export default BuyerProfile;
