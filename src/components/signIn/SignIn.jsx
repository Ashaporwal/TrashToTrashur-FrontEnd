import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import EndPoint from "../../apis/EndPoint";
import 'react-toastify/dist/ReactToastify.css';


 function SignIn() {

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [state,setState] = useState({
     email:"",
     password:""
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
    try{
    if (state.email && state.password) {
      let response = await axios.post(EndPoint.SIGN_IN,state);
      sessionStorage.setItem("current-user",JSON.stringify(response.data.user));
      const user = response.data.user;
      
      toast.success("Logged in successfully!");

      if(user.role === "buyer"){
        setTimeout(()=>navigate("/home",1000))
    }else{
        setTimeout(()=>navigate("/product"),2000);
      }
    } 
    else 
      toast.error("Please enter valid email..");
    
  }
    catch(err){
      console.log(err);
      toast.error(err.response?.data?.error || "SOmething went Wrong");
    }
  }
  
  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign In to Your Account</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value})}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) => setState({ ...state,password:e.target.value})}
            required
          />

          <button type="submit">Sign In</button>

          <p style={{ textAlign: "center" }}>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;