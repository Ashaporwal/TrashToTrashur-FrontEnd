import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const [tutorials, setTutorials] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Fetch Tutorials
  useEffect(() => {
    fetch("http://localhost:3000/tutorial/all")
      .then(res => res.json())
      .then(data => setTutorials(data))
      .catch(err => console.log("Error fetching tutorials:", err));
  }, []);

  // Fetch Gallery
  useEffect(() => {
    fetch("http://localhost:3000/gallery")
      .then(res => res.json())
      .then(data => setGallery(data))
      .catch(err => console.log("Error fetching gallery:", err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          marginTop: 10,
          backgroundColor: "#FFF9F0",
          borderRadius: 15,
          padding: "40px 20px",
          margin: "40px auto",
          maxWidth: 1000,
          width: "90%",
          minHeight: "80vh",
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left Text */}
        <div style={{ flex: "1 1 400px", minWidth: 300 }}>
          <h1 style={{ fontWeight: "bold", color: "#8C8C8C", fontSize: 15, fontFamily: "Poppins" }}>
            Check Out Our Latest Creations!
          </h1>
          <h4 style={{ margin: "32px 0 0", fontWeight: "bold", fontSize: 32, color: "#B28228" }}>
            Turning Everyday Waste <br /> into Something Special
          </h4>
          <p>
            We take ordinary materials and transform them into extraordinary handmade pieces.
            Every creation tells a story of care, creativity, and sustainability.
          </p>
          <Link to="">
            <button
              style={{
                backgroundColor: "#B28228",
                color: "#fff",
                fontSize: 20,
                borderRadius: 7,
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "8px 16px",
              }}
            >
              Become a Crafter
            </button>
          </Link>
        </div>

        {/* Right Video */}
        <div style={{ flex: "1 1 400px", minWidth: 300 }}>
          <video
            src="/dash2.mp4"
            autoPlay
            loop
            muted
            style={{
              width: 400,
              height: 250,
              borderRadius: 12,
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Section Heading */}
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h3 style={{ color: "#B28228", fontSize: 28, marginBottom: 8 }}>
          Bringing Forgotten Things Back to Life
        </h3>
        <p style={{ color: "#666", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Discover the beauty in repurposed materials. Our tutorials and stories show
          how simple items can be turned into something wonderful and sustainable.
        </p>
      </div>

      {/* Tutorials Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          padding: 30,
        }}
      >
        {tutorials.length > 0 ? (
          tutorials.map(t => (
            <div
              key={t._id}
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {t.images?.[0] && (
                <img
                  src={t.images[0]} // <-- remove /uploads prefix if using Cloudinary
                  alt={t.title}
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />
              )}
              <div style={{ padding: 15, flex: 1 }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 18 }}>{t.title.replace(/"/g, "")}</h3>
                <p style={{ margin: "0 0 12px", fontSize: 14, color: "#666" }}>
                  {t.description.replace(/"/g, "")}
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link to={`/tutorial/${t._id}`}>
                    <button
                      style={{
                        backgroundColor: "#B28228",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Explore Tutorial
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading tutorials...</p>
        )}
      </div>

      {/* Gallery Grid */}
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h4 style={{ color: "#B28228" }}>Our Transformation Stories</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            padding: 30,
          }}
        >
          {gallery.length > 0 ? (
            gallery.map(g => (
              <div
                key={g._id} className="gallery-card"
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  background: "#FFF9F0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                {g.before && (
                  <img
                    src={g.before} // <-- use full Cloudinary URL
                    alt="Before"
                    style={{ width: "100%", height: 120, objectFit: "cover" }}
                  />
                )}
                {g.after && (
                  <img
                    src={g.after} // <-- use full Cloudinary URL
                    alt="After"
                    style={{ width: "100%", height: 120, objectFit: "cover" }}
                  />
                )}
                <p style={{ padding: 10, fontWeight: "bold", textAlign: "center" }}>
                  {g.caption}
                </p>
              </div>
            ))
          ) : (
            <p>Loading gallery...</p>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        <Link to="/join-crafter">
          <button
            style={{
              width: 220,
              height: 60,
              backgroundColor: "#B28228",
              color: "#fff",
              fontSize: 18,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Join as a Crafter
          </button>
        </Link>

        <Link to="/tutorials">
          <button
            style={{
              width: 220,
              height: 60,
              backgroundColor: "#B28228",
              color: "#fff",
              fontSize: 18,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            View Tutorials
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;







// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Hero() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/product/") 
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data); 
//       })
//       .catch((err) => console.log("Error fetching products:", err));
//   }, []);

//   return (
//     <div>
//       {/* Hero Section */}
//       <div
//         className="message p-4"
//         style={{
//           marginTop: "10px",
//           backgroundColor: "#FFF9F0",
//           borderRadius: "15px",
//           padding: "40px 20px",
//           margin: "40px auto",
//           maxWidth: "1000px",
//           width: "90%",
//           minHeight: "80vh",
//           display: "flex",
//           gap: "40px",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
//           <h1
//             style={{
//               fontWeight: "bold",
//               color: "#8C8C8C",
//               margin: "0",
//               fontSize: "15px",
//               fontFamily: "Poppins",
//             }}
//           >
//             New Arrival!
//           </h1>
//           <h4
//             style={{
//               margin: "32px 0 0",
//               fontWeight: "bold",
//               fontSize: "32px",
//               color: "#B28228",
//             }}
//           >
//             Turning Waste
//             <br />
//             into Wonder
//           </h4>
//           <p>
//             Crafting ideas with care and creativity. Waste becomes wonder, and
//             every detail tells a new story.
//           </p>
//           <Link to="">
//             <button
//               style={{
//                 backgroundColor: "#B28228",
//                 color: "white",
//                 fontSize: "20px",
//                 borderRadius: "7px",
//                 border: "none",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 padding: "8px 16px",
//               }}
//             >
//               Join as a Crafter
//             </button>
//           </Link>
//         </div>

//         <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
//           <video
//             src="/dash2.mp4"
//             autoPlay
//             loop
//             muted
//             style={{
//               width: "400px",
//               height: "250px",
//               borderRadius: "12px",
//               objectFit: "cover",
//             }}
//           ></video>
//         </div>
//       </div>

//       {/* Heading */}
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <h5>Crafted from What Was Forgotten</h5>
//         <h6 style={{ fontWeight: "150" }}>
//           Upcycled materials. Handmade beauty. Sustainable living.
//         </h6>
//       </div>

// {/* 
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: "20px",
//           marginTop: "20px",
//         }}
//       >
//         {products && products.length > 0 ? (
//           products.map((item, index) => {
//             let imagePath = "/images/default.jpeg"; 
//             if (item.images && item.images.length > 0) {
//               const img = item.images[0];
      
//               imagePath = `/uploads/${img}`;
//             }

//             return (
//               <div
//                 key={index}
//                 style={{
//                   width: "280px",
//                   borderRadius: "12px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   overflow: "hidden",
//                   backgroundColor: "#fff",
//                   fontFamily: "sans-serif",
//                   margin: "20px",
//                 }}
//               >
//                 <img
//                   src={imagePath}
//                   alt={item.title}
//                   style={{ width: "100%", height: "180px", objectFit: "cover" }}
//                 />
//                 <div style={{ padding: "15px" }}>
//                   <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>
//                     {item.title}
//                   </h3>
//                   <p
//                     style={{
//                       margin: "0 0 12px",
//                       fontSize: "14px",
//                       color: "#666",
//                     }}
//                   >
//                     {item.description}
//                   </p>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontWeight: "bold",
//                         color: "#0f766e",
//                         fontSize: "16px",
//                       }}
//                     >
//                       ₹{item.price}
//                     </span>
//                     <button
//                       style={{
//                         backgroundColor: "#0f766e",
//                         color: "#fff",
//                         border: "none",
//                         borderRadius: "4px",
//                         padding: "6px 12px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div> */}

//       {/* Show More Button */}
//       <div style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
//         <Link to="/product">
//           <button
//             style={{
//               width: "200px",
//               height: "50px",
//               fontSize: "16px",
//               backgroundColor: "#B28228",
//               fontWeight: "300",
//               border: "none",
//               outline: "none",
//               color: "white",
//               cursor: "pointer",
//               borderRadius: "4px",
//             }}
//           >
//             Show More
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Hero;












































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