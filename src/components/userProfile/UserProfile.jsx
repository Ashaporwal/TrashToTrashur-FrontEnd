import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleClick = async () => {
    let user = JSON.parse(localStorage.getItem("user"));

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

      // Update localStorage user with new profile picture URL
      const updatedUser = { ...user, profilePicture: response.data.imageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setPreview(null);

      // Navigate to user dashboard/profile page after upload
      navigate("/userdashboard");
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            width: "350px",
            textAlign: "center",
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
                  objectFit: "cover",
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
              border: "none",
              cursor: "pointer",
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


