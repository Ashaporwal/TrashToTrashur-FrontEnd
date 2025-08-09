
// import Shop from "./Shop";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Hero from "./Hero";



function Header() {
  // const isLoggedIn = !!localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
    // Check login status on mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload(); // or use navigate("/")
  };
  return <>

  <div style={{justifyContent:"space-between", display:"flex"}}>
    
      {/* <div className="header" style={{ color: "black", padding: "10px", textAlign: "center", textDecoration: "none",width:"70vw",border : "1px solid black" }}> */}
  <div className="header" style={{ color: "black", padding: "10px", textAlign: "center", textDecoration: "none",width:"70vw" }}>

        <Link to="/" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}></Link>
        <Link to="/home" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Home</Link>
        {!isLoggedIn && (
          <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
          </>
        )}

        {isLoggedIn && (
          <>
          <Link to="/dashboard">DashBoard</Link>
          <button onClick={handleLogout}>Logout</button>
          </>
        )}
        <Link to="/product" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Product</Link>
        <Link to="/signUp" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Sign Up</Link>
        <Link to="/material" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Materials</Link>
        {/* <LinK to="/services" style={{color:"black",textDecoration:"none",margin: "0 10px"}}>Services</Link> */}
        <Link to="/contact" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Contact</Link>
         <Link to="/tutorial" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Tutorial</Link>
       </div>


                <div style={{ display: "flex", justifyContent: "center",width:"30vw",alignItems:"center"}}>
          <Link to="/user" style={{ color: "black", marginRight: "10px" }}>
            <i className="fa-regular fa-user" style={{ fontSize: "20px" }}></i>
          </Link>

          <Link to="/search" style={{ color: "black",  marginRight: "10px" }}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "20px" }}></i>
          </Link>

          <Link to="/likes" style={{ color: "black",marginRight: "10px" }}>
            <i className="fa-regular fa-heart" style={{ fontSize: "20px" }}></i>

          </Link>

          <Link to="/cart" style={{ color: "black", marginRight: "10px" }}>
            <i className="fa-regular fa-cart-shopping" style={{ fontSize: "20px" }}></i>
          </Link>
        </div>
        
      </div>
  </>
}

export default Header;