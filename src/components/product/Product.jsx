import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import productData from "../data/ProductData";


function Product() {
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate("/buy-now", { state: product });
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#FFF9F0", height: "250px", paddingTop: "25px" }}>
        <h1 style={{ textAlign: "center", fontWeight: "lighter", padding: "55px" }}>
          Home - Shop
        </h1>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
        {productData.map((product) => (
          <div
            key={product.id}
            style={{
              width: "280px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              backgroundColor: "#fff"
            }}
          >
            <img src={product.image} alt={product.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px" }}>{product.title}</h3>
              <p style={{ margin: "0 0 12px", color: "#666" }}>{product.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "bold", color: "#0f766e" }}>₹{product.price}</span>
                <button
                  style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", padding: "6px 12px" }}
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Product;














// import Footer from "../Footer";
// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { Link } from "react-router-dom";
// import Header from "../Header";
// function Product(){
//     return <>

//     <Header/>
//     <div style={{backgroundColor:"#FFF9F0", height:"250px",paddingTop:"25px"}}>
//         <h1 style={{textAlign:"center", fontWeight:"lighter", padding:"55px"}}>Home-Shop</h1>
//     </div>


// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px",flex:"1 1 280px" }}>
// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
        
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif", transition: "all 0.3s ease-in-out",}}>
//           <img src="/images/4.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>


// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/5.jpg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>


// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/6.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>



// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/7.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>



// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/8.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>




// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/CD.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>


// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/8.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/9.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/11.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//           <div style={{ padding: "15px" }}>
//             <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>Recycled Tote Bag</h3>
//             <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
//               Made from old jeans and eco-friendly fabrics.
//             </p>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}>₹349</span>
//               <button style={{ backgroundColor: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

// </div>




// {/* <div style={{display:"flex",alignItems:"center"}}> */}
// <div style={{backgroundColor:"white",height:"120px",paddingTop:"35px"}}>
//   <Stack spacing={2} style={{alignItems:"center"}}>
//      <Link to="/product1"><Pagination count={4} variant="outlined" shape="rounded" />

// </Link> 
//     </Stack>
// </div>
// {/* </div> */}


// {/* <div> */}
// <div style={{backgroundColor:"#FFF9F0" ,display:"flex",justifyContent: "space-around", alignItems: "center", padding: "20px",height:"150px"}}>
//   <i className="fa-solid fa-trophy" style={{color:"black",fontSize:"50px",display:"flex"}}> 
//     <h6 style={{fontFamily:"-moz-initial",marginLeft:"8px"}}>High Quality</h6>
//   </i>

// <i className="fa-solid fa-calendar-check" style={{color:"black",fontSize:"50px",display:"flex"}}>
//    <h6 style={{fontFamily:"-moz-initial",marginLeft:"8px"}}>High Quality</h6>
// </i>

// <i className="fa-solid fa-hand-holding-heart" style={{color:"black",fontSize:"50px",display:"flex"}}>
//    <h6 style={{fontFamily:"-moz-initial",marginLeft:"8px"}}>High Quality</h6>
// </i>

// <i className="fa-solid fa-headset" style={{color:"black",fontSize:"50px",display:"flex"}}>
//   <h6 style={{fontFamily:"-moz-initial",marginLeft:"8px"}}>High Quality</h6>
// </i>

// {/* </div> */}
// </div>

// {/* </div> */}
// <Footer/>
//     </>

// }

// export default Product;