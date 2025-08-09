import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser } from "../auth/Auth";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

// ✅ Dashboard Component
function UserProfileDashboard({ profilePic, user }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
          width: "350px"
        }}
      >
        <img
          src={profilePic}
          alt="Profile"
          width="120"
          height="120"
          style={{
            borderRadius: "50%",
            border: "3px solid #a6c1ee",
            objectFit: "cover"
          }}
        />
        <h2 style={{ margin: "15px 0", color: "#333" }}>{user?.name}</h2>
        <p style={{ color: "#777" }}>{user?.email}</p>
        <p
          style={{
            display: "inline-block",
            padding: "5px 15px",
            background: "#a6c1ee",
            color: "#fff",
            borderRadius: "20px",
            fontSize: "14px"
          }}
        >
          {user?.role}
        </p>
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          🎉 Your profile is updated successfully!
        </div>
      </div>
    </div>
  );
}

function UserProfile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleClick = async () => {
    let user = getCurrentUser();

    if (!user) {
      toast.error("Please log in first!");
      return;
    }
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("imageName", file);

      let response = await axios.patch(
        `${EndPoint.UPLOAD_FILE}/${user._id}`,
        formData
      );

      toast.success("Profile picture uploaded successfully!");
      setProfilePic(response.data.imageUrl);
      setPreview(null);
      setShowDashboard(true); // ✅ Show dashboard
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong");
    }
  };

  // ✅ Agar dashboard dikhana hai
  if (showDashboard) {
    return (
      <>
        <ToastContainer />
        <UserProfileDashboard
          profilePic={profilePic}
          user={getCurrentUser()}
        />
      </>
    );
  }

  // ✅ Default Upload UI
  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #89f7fe, #66a6ff)"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            width: "350px",
            textAlign: "center"
          }}
        >
          <h3 style={{ marginBottom: "20px", color: "#333" }}>
            Upload Profile Picture
          </h3>

          <input
            onChange={handleChange}
            type="file"
            className="form-control mb-3"
            style={{ borderRadius: "10px", padding: "10px" }}
          />

          {preview && (
            <div style={{ marginBottom: "15px" }}>
              <img
                src={preview}
                alt="Preview"
                width="120"
                height="120"
                style={{
                  borderRadius: "50%",
                  border: "3px solid #66a6ff",
                  objectFit: "cover"
                }}
              />
            </div>
          )}

          <button
            onClick={handleClick}
            className="btn btn-primary"
            style={{
              borderRadius: "25px",
              padding: "10px 20px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #66a6ff, #89f7fe)",
              border: "none"
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
