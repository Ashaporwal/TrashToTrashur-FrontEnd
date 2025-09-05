import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EndPoint from "../../apis/EndPoint";
import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({ email: "", password: "" });
  const [role, setRole] = useState("crafter"); // default role is crafter
  const [showPassword, setShowPassword] = useState(false);

  // Change role tab
  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!state.email || !state.password) {
        toast.error("Please enter valid email and password");
        return;
      }

      const response = await axios.post(
        EndPoint.SIGN_IN,
        { ...state, role },
        { withCredentials: true }
      );

      const user = response.data.user;

      // Check if selected role matches the one from backend
      if (user.role !== role) {
        toast.error(`You are a ${user.role}. Please login with correct role.`);
        return;
      }

      // Save token and user info in sessionStorage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("current-user", JSON.stringify(user));
      sessionStorage.setItem("role", user.role);
      sessionStorage.setItem("userId", user._id);

      sessionStorage.getItem("userId");

      toast.success("Logged in successfully!");

      // Redirect based on role
      const redirectTo = location.state?.from || (user.role === "buyer" ? "/home" : "/product");
      setTimeout(() => navigate(redirectTo), 1000);

    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signin-container signin-center">
        <div className="signin-right">
          <form className="signin-form" onSubmit={handleSubmit}>
            <h2>Login</h2>

            {/* Role Tabs */}
            <div className="role-tabs">
              <button
                type="button"
                className={role === "crafter" ? "active" : ""}
                onClick={() => handleRoleChange("crafter")}
              >
                Crafter
              </button>
              <button
                type="button"
                className={role === "buyer" ? "active" : ""}
                onClick={() => handleRoleChange("buyer")}
              >
                Buyer
              </button>
            </div>

            {/* Email */}
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                required
              />
              <span className="input-icon">📧</span>
            </div>

            {/* Password */}
            <div className="input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
                required
              />
              <span
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Submit */}
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

