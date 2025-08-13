import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import EndPoint from '../../apis/EndPoint';
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("crafter");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role:"crafter",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleRoleChange = (newRole) => {
  setRole(newRole);
  setFormData({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: newRole,  // add this line
  });
}

  // const handleRoleChange = (newRole) => {
  //   setRole(newRole);
  //   setFormData({ name: "", email: "", password: "", contact: "" });
  // }




  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
  // console.log({ username, email, password });
    e.preventDefault();
    try {
      console.log("Inside try signup");
      
      setIsLoading(true);
      let response = await axios.post(EndPoint.SIGN_UP, {formData, role });
      // console.log("Signing up as", role, formData);
      console.log("Sending data:", { ...formData, role });
      toast.success( "Signup successful!");
      setTimeout(() => navigate("/home"), 2000); 
      setFormData({
        name: "",
        email: "",
        password: "",
        contact: "",
        role:role
      });
   
    } catch (err) {
      console.log("SignUp error:",err);

      toast.error( "Signup failed")
    }
    // toast.success(response.data.message);
    // setFormData({
    //   name: "",
    //   email: "",
    //   password: "",
    //   contact: ""
    // });

    // catch(err){
    //   console.log(err);
    //   toast.error("Oops! something went Wrong..");
    // }
    setIsLoading(false);
  }
  return <>
    <ToastContainer />
    <div className="signup-container">
      <div className="role-tabs">
        <button className={role === "crafter" ? "active" : ""} onClick={() => handleRoleChange("crafter")}>Crafter</button>
        <button className={role === "buyer" ? "active" : ""} onClick={() => handleRoleChange("buyer")}>Buyer</button>
      </div>

     <form className="signup-form" onSubmit={handleSubmit}>
  <h2>{role === "crafter" ? "Join as a Crafter" : "Sign Up as a Buyer"}</h2>

  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={formData.name}
    onChange={handleInputChange}
    required
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
  />
  <input
    type="text"
    name="contact"
    placeholder="Contact Number"
    value={formData.contact}
    onChange={handleInputChange}
    required
  />

  <button type="submit">{isLoading ? "Creating..." : "Create Account"}</button>

  <p style={{ textAlign: "center" }}>
    Already have an account? <Link to="/signIn">Sign In</Link>
  </p>
</form>



    </div>

    {/* ) */}
  </>

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
