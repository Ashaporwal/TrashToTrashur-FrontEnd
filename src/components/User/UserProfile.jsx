import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { getCurrentUser } from "../auth/Auth";

function UserProfile() {
  const [user, setUser] = useState({});
  const [editableSection, setEditableSection] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    sessionStorage.setItem("current-user", JSON.stringify(user));
    setEditableSection("");
    setOpenSnackbar(true);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("profile", selectedFile);

    fetch(`http://localhost:5000/user/upload/${user._id}`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.imageUrl) {
          setUser(prev => ({ ...prev, profilePicture: data.imageUrl }));
          setSelectedFile(null);
          setOpenSnackbar(true);
        }
      })
      .catch(console.error);
  };

  const personalFields = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email" },
    { label: "Date of Birth", name: "dob" },
  ];

  const addressFields = [
    { label: "Country", name: "country" },
    { label: "City", name: "city" },
    { label: "Postal Code", name: "postalCode" },
  ];

  const renderFields = (fields, section) =>
    fields.map(field => (
      <TextField
        key={field.name}
        label={field.label}
        name={field.name}
        value={user[field.name] || ""}
        onChange={handleChange}
        InputProps={{ readOnly: editableSection !== section }}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: editableSection === section ? "#FFF9F0" : "#F5F5F5",
            borderRadius: 2,
          },
        }}
      />
    ));

  return (
    <Box sx={{ maxWidth: 900, margin: "50px auto", p: 3 }}>
      {/* Profile Card */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          bgcolor: "#FFF",
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            src={user.profilePicture}
            sx={{
              width: 120,
              height: 120,
              border: "3px solid #B28228",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            {!user.profilePicture && user.name?.[0]}
          </Avatar>

          {editableSection === "profile" && (
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
              <Button variant="contained" onClick={handleUpload}>Upload</Button>
            </Box>
          )}
        </Box>
        <Box sx={{ ml: 3 }}>
          <Typography variant="h5" fontWeight="700">{user.name || "User Name"}</Typography>
          <Typography variant="body2" color="text.secondary">{user.role || "USER"}</Typography>
          <Typography variant="body2" color="text.secondary">{user.city}, {user.country}</Typography>
          <Button
            size="small"
            sx={{ mt: 1 }}
            onClick={() => setEditableSection(editableSection === "profile" ? "" : "profile")}
          >
            {editableSection === "profile" ? "Cancel" : "Change Photo"}
          </Button>
        </Box>
      </Box>

      {/* Personal Info */}
      <Box sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: "0 6px 15px rgba(0,0,0,0.08)", bgcolor: "#FFF" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" fontWeight="600">Personal Information</Typography>
          <Tooltip title={editableSection === "personal" ? "Cancel Edit" : "Edit Info"}>
            <IconButton onClick={() => setEditableSection(editableSection === "personal" ? "" : "personal")}>
              <EditIcon color={editableSection === "personal" ? "error" : "primary"} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {renderFields(personalFields, "personal")}
        </Box>
        {editableSection === "personal" && (
          <Button sx={{ mt: 2 }} variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </Box>

      {/* Address */}
      <Box sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: "0 6px 15px rgba(0,0,0,0.08)", bgcolor: "#FFF" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" fontWeight="600">Address</Typography>
          <Tooltip title={editableSection === "address" ? "Cancel Edit" : "Edit Address"}>
            <IconButton onClick={() => setEditableSection(editableSection === "address" ? "" : "address")}>
              <EditIcon color={editableSection === "address" ? "error" : "primary"} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {renderFields(addressFields, "address")}
        </Box>
        {editableSection === "address" && (
          <Button sx={{ mt: 2 }} variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          🎉 Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserProfile;

