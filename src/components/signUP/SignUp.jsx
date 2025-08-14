import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import EndPoint from '../../apis/EndPoint';
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("crafter");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "crafter",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData({
      name: "",
      email: "",
      password: "",
      contact: "",
      role: newRole,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(EndPoint.SIGN_UP, { ...formData },{withCredentials:true});
      toast.success("Your account has been created!");
      setTimeout(() => navigate("/signIn"), 2000);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        contact: "",
        role,
      });

    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  }

  return (
    <>
      <ToastContainer />
      <div className="signup-container">

        {/* Left Illustration */}
        <div className="signup-left">
        <img 
  src="/images/login.png" 
  alt="Treasure Illustration" 
  className="login-image"
/>
        </div>

        {/* Right Form */}
        <div className="signup-right">
          <form className="signup-form" onSubmit={handleSubmit}>
            
            <h2>{role === "crafter" ? "Join as a Crafter" : "Sign Up as a Buyer"}</h2>

            {/* Role Selection */}
            <div className="role-tabs">
              <button 
                type="button" 
                className={role === "crafter" ? "active" : ""} 
                onClick={() => handleRoleChange("crafter")}>
                Crafter
              </button>
              <button 
                type="button" 
                className={role === "buyer" ? "active" : ""} 
                onClick={() => handleRoleChange("buyer")}>
                Buyer
              </button>
            </div>

            {/* Input Fields */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="username"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
                autoComplete="new-password"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />

            <button type="submit">
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="login-link">
              Already have an account? <Link to="/signIn">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;





{/* // import React, { useState } from "react";
// import "./SignUp.css";

// const SignUp = () => {
//   const [role, setRole] = useState("crafter");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (newRole) => {
//     setRole(newRole);
//     setFormData({ name: "", email: "", password: "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signing up as", role, formData);
//   };

//   return (
//     <div className="signup-container">
//       <div className="role-tabs">
//         <button className={role === "crafter" ? "active" : ""} onClick={() => handleRoleChange("crafter")}>Crafter</button>
//         <button className={role === "buyer" ? "active" : ""} onClick={() => handleRoleChange("buyer")}>Buyer</button>
//       </div>

//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2>{role === "crafter" ? "Join as a Crafter" : "Sign Up as a Buyer"}</h2>

//         <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />

//         {role === "crafter" && (
//           <input type="text" name="skills" placeholder="Your Crafting Skills" onChange={handleInputChange} />
//         )}

//         {role === "buyer" && (
//           <input type="text" name="interests" placeholder="Your Interests" onChange={handleInputChange} />
//         )}

//         <button type="submit">Create Account</button>
//       </form>

     
//     </div>


//   );
// };

// export default SignUp; */}
