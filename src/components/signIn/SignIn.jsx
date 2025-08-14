import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EndPoint from "../../apis/EndPoint";
import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(state.email && state.password){
        const response = await axios.post(EndPoint.SIGN_IN, state);
        const user = response.data.user;
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("current-user", JSON.stringify(user));
        toast.success("Logged in successfully!");
        if(user.role==="buyer") setTimeout(()=>navigate("/home"),1000);
        else setTimeout(()=>navigate("/product"),1000);
      } else {
        toast.error("Please enter valid email and password");
      }
    } catch(err){
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="signin-container">
        {/* Left Illustration */}
        <div className="signin-left">
    {/* <img 
  src="/images/login.png" 
  alt="Treasure Illustration" 
  style={{ width: "400px", height: "400px" }}  */}
  <img 
  src="/images/login.png" 
  alt="Treasure Illustration" 
  className="login-image"
/>
        </div>

        {/* Right Form */}
        <div className="signin-right">
          <form className="signin-form" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                value={state.email}
                onChange={e=>setState({...state,email:e.target.value})}
                required
              />
              <span className="input-icon">📧</span>
            </div>

            <div className="input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={state.password}
                onChange={e=>setState({...state,password:e.target.value})}
                required
              />
              <span className="input-icon" onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="login-btn">Log In</button>

            <p className="or-text">Or Continue With</p>
            <div className="social-login">
              <button className="social-btn google">G</button>
              <button className="social-btn facebook">F</button>
              <button className="social-btn apple"></button>
            </div>

            <p className="signup-link">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
