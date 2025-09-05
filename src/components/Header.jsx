import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
const role = sessionStorage.getItem("role");
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userInfo = sessionStorage.getItem("current-user");

    setIsLoggedIn(!!token);

    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setUser(parsedUser);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("current-user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>

      {/* Centered Links */}
    <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
  <Link to="/home" style={{ margin: "0 15px", textDecoration: "none", color: "black" }}>Home</Link>
  <Link to="/product" style={{ margin: "0 15px", textDecoration: "none", color: "black" }}>Product</Link>
  {/* <Link to="/material-crafter" style={{ margin: "0 15px", textDecoration: "none", color: "black" }}>Materials</Link> */}
  <Link
  to={role === "crafter" ? "/material-crafter" : "/material-buyer"}
  style={{ margin: "0 15px", textDecoration: "none", color: "black" }}
>
  Materials
</Link>
  <Link to="/contact" style={{ margin: "0 15px", textDecoration: "none", color: "black" }}>Contact</Link>
  {/* <Link to="/crafterprofiel" style={{margin:"0 15px",textDecoration:"none", color:"black"}}></Link> */}

  {/* Tutorial link text changes based on role */}
  {isLoggedIn && user && (
    <Link to="/tutorial" style={{ margin: "0 15px", textDecoration: "none", color: "black" }}>
      {/* {user.role === "buyer" ? "View Tutorials" : "Tutorial"} */}
      {user.role === "buyer" ? "Browse Tutorials" : "Tutorial"}
    </Link>
  )}
</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {isLoggedIn ? (
          <>
            {/* <Link to="/crafter-profile" style={{ color: "black" }}>
              {user?.profilePicture ? (
                <Avatar
                  alt={user.name || "User"}
                  src={user.profilePicture}
                  sx={{ width: 40, height: 40 }}
                />
              ) : (
                <Avatar sx={{ width: 40, height: 40 }}>
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </Avatar>
              )}
            </Link> */}
{/* 
            <Link to="/search" style={{ color: "black" }}>
              <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "20px" }}></i>
            </Link> */}

            <Link to="/likes" style={{ color: "black" }}>
              <i className="fa-regular fa-heart" style={{ fontSize: "20px" }}></i>
            </Link>
<Link
  to={role === "crafter" ? "/crafter-profile" : "/buyer-profile"}
  style={{ color: "black" }}
>
  <i className="fa-regular fa-user" style={{ fontSize: "20px" }}></i>
</Link>




{/* <Link to="/crafter-profile" style={{color:"black"}}>
<i className="fa-regular fa-user" style={{fontSize:"20px"}}></i>
</Link> */}
            <button
              onClick={handleLogout}
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "1px solid black",
                background: "white"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signIn"
            style={{
              padding: "5px 10px",
              border: "1px solid black",
              borderRadius: "5px",
              textDecoration: "none",
              color: "black"
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;

















// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { colors } from "@mui/joy";

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //   const token = localStorage.getItem("token");
// //   const userInfo = localStorage.getItem("user");

// //   setIsLoggedIn(!!token);

// //   if (userInfo) {
// //     const parsedUser = JSON.parse(userInfo);  // yahan define karo
// //     console.log("User info from localStorage:", parsedUser);
// //     setUser(parsedUser);
// //   } else {
// //     setUser(null);
// //   }
// // }, []);

// useEffect(() => {
//   const token = sessionStorage.getItem("token");  
//   const userInfo = sessionStorage.getItem("current-user");

//   setIsLoggedIn(!!token);

//   if (userInfo) {
//     const parsedUser = JSON.parse(userInfo);
//     setUser(parsedUser);
//   } else {
//     setUser(null);
//   }
// }, []);

//   console.log("Is logged in:", isLoggedIn); 


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     window.location.reload();
//   };

//   return (
//     <div style={{ justifyContent: "space-between", display: "flex" }}>
//       <div
//         className="header"
//         style={{
//           color: "black",
//           padding: "10px",
//           textAlign: "center",
//           textDecoration: "none",
//           width: "70vw",
//         }}
//       >
//         <Link to="/home" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>
//           Home
//         </Link>

      
//         {!isLoggedIn ? (
//           <>
//             <Link to="/signIn" style={{ margin: "0 10px" }}>
//               Login
//             </Link>
//             <Link to="/signUp" style={{ margin: "0 10px" }}>
//               Sign Up
//             </Link>
//           </>
//         ) : (
//           <>
//             {/* <Link to="/userdashboard" style={{ margin: "0 10px" }}>
//               Dashboard
//             </Link> */}
            
//             {/* <button onClick={handleLogout} style={{ margin: "0 10px", cursor: "pointer" }}> */}
//             <Link to="/logout" style={{color:"black",textDecoration:"none",margin:'0 10px'}}>
//               Logout
//             </Link>
            
            
//           </>
//         )}

//         <Link to="/product" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>
//           Product
//         </Link>
//         <Link to="/material" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>
//           Materials
//         </Link>
//         <Link to="/contact" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>
//           Contact
//         </Link>
//         <Link to="/tutorial" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>
//           Tutorial
//         </Link>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           width: "30vw",
//           alignItems: "center",
//         }}
//       >
    
//         <Link to="/userdashboard" style={{ color: "black", marginRight: "10px" }}>
//   {isLoggedIn && user?.profilePicture ? (
//     <img
//       src={user.profilePicture}
//       alt="Profile"
//       style={{
//         width: "30px",
//         height: "30px",
//         borderRadius: "50%",
//         objectFit: "cover",
//       }}
//     />
//   ) : (
//     <i className="fa-regular fa-user" style={{ fontSize: "20px" }}></i>
//   )}
// </Link>

//         <Link to="/search" style={{ color: "black", marginRight: "10px" }}>
//           <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "20px" }}></i>
//         </Link>

//         <Link to="/likes" style={{ color: "black", marginRight: "10px" }}>
//           <i className="fa-regular fa-heart" style={{ fontSize: "20px" }}></i>
//         </Link>

//         <Link to="/cart" style={{ color: "black", marginRight: "10px" }}>
//           <i className="fa-regular fa-cart-shopping" style={{ fontSize: "20px" }}></i>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Header;

















// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);  // user state add kiya

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);

//     // Agar user info localStorage me stored hai (stringified JSON)
//     const userInfo = localStorage.getItem("user");
//     if (userInfo) {
//       setUser(JSON.parse(userInfo));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user"); // user info bhi clear karo logout par
//     setIsLoggedIn(false);
//     setUser(null);
//     window.location.reload();
//   };

//   return (
//     <>
//       <div style={{ justifyContent: "space-between", display: "flex" }}>
//         <div className="header" style={{ color: "black", padding: "10px", textAlign: "center", textDecoration: "none", width: "70vw" }}>
//           <Link to="/home" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Home</Link>
//           {!isLoggedIn && (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Sign up</Link>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//               <Link to="/dashboard">DashBoard</Link>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           )}
//           <Link to="/product" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Product</Link>
//           <Link to="/signUp" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Sign Up</Link>
//           <Link to="/material" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Materials</Link>
//           <Link to="/contact" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Contact</Link>
//           <Link to="/tutorial" style={{ color: "black", textDecoration: "none", margin: "0 10px" }}>Tutorial</Link>
//         </div>

//         <div style={{ display: "flex", justifyContent: "center", width: "30vw", alignItems: "center" }}>
//           <Link to="/user" style={{ color: "black", marginRight: "10px" }}>
//             {isLoggedIn && user?.profilePicture ? (
//               <img
//                 src={user.profilePicture}
//                 alt="Profile"
//                 style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }}
//               />
//             ) : (
//               <i className="fa-regular fa-user" style={{ fontSize: "20px" }}></i>
//             )}
//           </Link>

//           <Link to="/search" style={{ color: "black", marginRight: "10px" }}>
//             <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "20px" }}></i>
//           </Link>

//           <Link to="/likes" style={{ color: "black", marginRight: "10px" }}>
//             <i className="fa-regular fa-heart" style={{ fontSize: "20px" }}></i>
//           </Link>

//           <Link to="/cart" style={{ color: "black", marginRight: "10px" }}>
//             <i className="fa-regular fa-cart-shopping" style={{ fontSize: "20px" }}></i>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Header;
