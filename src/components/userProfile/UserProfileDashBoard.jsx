import { useState } from "react";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { getCurrentUser } from "../auth/Auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfileDashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(getCurrentUser());

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    try {
      let formData = new FormData();
      formData.append("imageName", file);

      const res = await axios.patch(
        `${EndPoint.UPLOAD_FILE}/${user._id}`,
        formData
      );

      toast.success("Profile updated!");
      setUser({ ...user, profilePicture: res.data.imageUrl });
      setPreview(null);
    } catch (err) {
      toast.error("Error uploading file");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <ToastContainer />
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          gap: "40px",
          width: "800px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        {/* Profile Picture */}
        <div style={{ flex: "1", textAlign: "center" }}>
          <img
            src={preview || user?.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "5px solid #3B82F6",
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: "15px" }}
          />
          <button
            onClick={handleUpload}
            style={{
              marginTop: "10px",
              background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Change Picture
          </button>
        </div>

        {/* User Details */}
        <div style={{ flex: "2" }}>
          <h2 style={{ marginBottom: "10px", color: "#333" }}>
            {user?.name || "User Name"}
          </h2>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Contact:</strong> {user?.contact}</p>
          <p><strong>Role:</strong> {user?.role}</p>

          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                background: "#10B981",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "10px",
                border: "none",
                marginRight: "10px",
              }}
            >
              Edit Details
            </button>
            <button
              style={{
                background: "#EF4444",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "10px",
                border: "none",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
