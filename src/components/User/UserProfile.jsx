import React, { useState, useEffect } from "react";
import { Avatar, Typography, Box, TextField, Button } from "@mui/material";
import { getCurrentUser } from "../auth/Auth";

function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    nationality: "",
    mobile: "",
    profilePicture: "",
  });
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    sessionStorage.setItem("current-user", JSON.stringify(user));
    setEditable(false);
    alert("Profile updated successfully!");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={5}
      p={3}
      maxWidth="400px"
      margin="auto"
      boxShadow={3}
      borderRadius={2}
    >
      {/* Avatar */}
      <Box mb={2} display="flex" flexDirection="column" alignItems="center">
        {user.profilePicture ? (
          <Avatar src={user.profilePicture} sx={{ width: 100, height: 100 }} />
        ) : (
          <Avatar sx={{ width: 100, height: 100 }}>
            {user.name?.[0]}
          </Avatar>
        )}

        {editable && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />
        )}
      </Box>

      {/* User Details */}
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        margin="normal"
        InputProps={{ readOnly: !editable }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        margin="normal"
        InputProps={{ readOnly: !editable }}
      />
      <TextField
        fullWidth
        label="Date of Birth"
        name="dob"
        type="date"
        value={user.dob}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly: !editable }}
      />
      <TextField
        fullWidth
        label="Nationality"
        name="nationality"
        value={user.nationality}
        onChange={handleChange}
        margin="normal"
        InputProps={{ readOnly: !editable }}
      />
      <TextField
        fullWidth
        label="Mobile Number"
        name="mobile"
        value={user.mobile}
        onChange={handleChange}
        margin="normal"
        InputProps={{ readOnly: !editable }}
      />

      {/* Buttons */}
      <Box mt={2} display="flex" gap={2}>
        <Button
          variant={editable ? "outlined" : "contained"}
          onClick={() => setEditable(!editable)}
        >
          {editable ? "Cancel" : "Edit Profile"}
        </Button>

        {editable && (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Profile
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default UserProfile;

