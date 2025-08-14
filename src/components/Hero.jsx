
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Hero() {
  return (
    <>
      {/* <Header /> */}

      <div
        className="message p-4"
        style={{
          marginTop: "10px",
          backgroundColor: "#FFF9F0",
          borderRadius: "15px",
          padding: "40px 20px",
          margin: "40px auto",
          maxWidth: "1000px",
          width: "90%",
          minHeight: "80vh",
          display: "flex",
          gap: "40px",
          alignItems: "center",
          boxSizing: "border-box",
          flexWrap: "wrap"
        }}
      >
     
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          <h1 style={{ fontWeight: "bold",
              color: "#8C8C8C",
              margin: "0",
              fontSize: "15px",
              fontFamily: "Poppins"
            }}
          >
            New Arrival!
          </h1>
          <h4
            style={{
              margin: "32px 0 0",
              fontWeight: "bold",
              fontSize: "32px",
              color: "#B28228"
            }}
          >
            Turning Waste<br /> into Wonder
          </h4>
          <p>
            Crafting ideas with care and creativity. Waste becomes wonder, and
            every detail tells a new story.
          </p>
          <Link to="/DiyTutorials">
            <button
              style={{
                backgroundColor: "#B28228",
                color: "white",
                fontSize: "20px",
                borderRadius: "7px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "8px 16px"
              }}
            >
              Join as a Crafter
            </button>
          </Link>
        </div>

        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
      <video 
  src="/dash.mp4" 
  autoPlay 
  loop 
  muted 
  style={{ width: "400px", height: "250px", borderRadius: "12px", objectFit: "cover" }}
></video>

        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h5>Crafted from What Was Forgotten</h5>
        <h6 style={{ fontWeight: "150" }}>
          Upcycled materials. Handmade beauty. Sustainable living.
        </h6>
      </div>


      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={index}
            style={{
              width: "280px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              backgroundColor: "#fff",
              fontFamily: "sans-serif",
              margin: "20px"
            }}
          >
            <img
              src={`/images/${item}.jpeg`}
              alt={`Product ${item}`}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>
                Recycled Tote Bag
              </h3>
              <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#666" }}>
                Made from old jeans and eco-friendly fabrics.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span
                  style={{ fontWeight: "bold", color: "#0f766e", fontSize: "16px" }}
                >
                  ₹349
                </span>
                <button
                  style={{
                    backgroundColor: "#0f766e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    cursor: "pointer"
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
        <Link to="/product">
          <button
            style={{
              width: "200px",
              height: "50px",
              fontSize: "16px",
              backgroundColor: "#B28228",
              fontWeight: "300",
              border: "none",
              outline: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "4px"
            }}
          >
            Show More
          </button>
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default Hero;







































// import Footer from "./Footer";
// import { Link } from "react-router-dom";

// // import img1 from "../assets/images/3.jpeg";
// // import img2 from "../assets/images/2.jpg";


// function Hero() {
//   return <>
//     <div className="message p-4" style={{marginTop:"10px", backgroundColor: "#FFF9F0", borderRadius: "15px", padding: "40px 20px", margin: "40px auto", maxWidth: "1000px", width: "90%", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", boxSizing: "border-box", }}>
//       <h1 style={{ fontWeight: "bold", color: "#8C8C8C", margin: "0", fontSize: "15px", fontFamily: "Poppins" }}> New Arrival!<br /></h1>
//       <h4 style={{ marginLeft: "1px", fontWeight: "bold", margin: "32px", fontSize: "32px", color: "#B28228", marginBlock: "0" }}>Turning Waste<br /> into Wonder</h4>
//       <p>Crafting ideas with care and creativity. Waste becomes<br /> wonder, and every detail tells a new story.</p>

//       <Link to="/DiyTutorials" ><button style={{ backgroundColor: "#B28228", color: "white", fontSize: "20px", borderRadius: "7px", border: "none", fontWeight: "bold", cursor: "pointer", padding: "8px 16px" }}>Join as a Crafter</button>
//       </Link>
//     </div>
//     <div style={{ textAlign: "center" }}>
//       <h5>Crafted from What Was Forgotten</h5>
//       <h6 style={{ fontWeight: "150" }}>Upcycled materials. Handmade beauty. Sustainable living.</h6>
//     </div>




//     <div style={{ display: "flex",flexWrap:"wrap",justifyContent:"center",gap:"20px" }}>
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/3.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
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


//  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/13.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
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


//        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
//         {/* Card 1 */}
//         <div style={{ width: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", backgroundColor: "#fff", fontFamily: "sans-serif" }}>
//           <img src="/images/12.jpeg" alt="Product 1" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
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



//        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px" }}>
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
//     </div>
//     <div style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
//     <Link to="/product"> <button style={{ width: "200px", height: "50px", fontSize: "16px", backgroundColor: "#B28228", fontWeight: "300",border:"none",outline:"none",color:"white",cursor:"pointer",borderRadius:"4px" }}>
//         Show More
//       </button>
//       </Link>
           
//     </div>

//     <Footer />
//   </>
// }

// export default Hero;