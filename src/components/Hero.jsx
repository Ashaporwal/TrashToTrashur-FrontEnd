import React, { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const [scrollY, setScrollY] = useState(0);


  
const navigate = useNavigate();

const handleCrafterClick = () => {
  navigate("/tutorial"); // goes to tutorial page
};

const goToProduct = () => {
  navigate("/product");
};



  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Featured Products Example
  const featuredProducts = [
    { id: 1, image: "/icon/chair.jpg", title: "Upcycled Chair", description: "Handmade from old wood." },
    { id: 2, image: "/icon/ecolamp.jpg", title: "Eco Lamp", description: "Creative recycled design." },
    { id: 3, image: "/icon/papervase.jpeg", title: "Paper Vase", description: "Made from recycled paper." },
  ];

  const steps = [
    { icon: "/icon/collect.jpg", title: "Collect", description: "Gather materials that can be upcycled." },
    { icon: "/icon/upcycle.jpg", title: "Upcycle", description: "Transform waste into beautiful creations." },
    { icon: "/icon/sell.jpeg", title: "Sell", description: "Share your creations with the world." },
    { icon: "/icon/life.jpg", title: "Inspire", description: "Inspire others to be eco-friendly." },
  ];

  const features = [
    { title: "Eco-Friendly", icon: "/icon/kanuji.jpg" },
    { title: "Upcycled Designs", icon: "/icon/diytutorial.jpg" },
    { title: "Handmade", icon: "/icon/handmade.jpg" },
  ];

  const stats = [
    { label: "Items Upcycled", value: 500 },
    { label: "Happy Crafters", value: 200 },
    { label: "Tutorials", value: 50 },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  // Animated counter
  const AnimatedCounter = ({ value }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = value;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
    }, [value]);
    return <span style={{ fontWeight: "bold", fontSize: 24, color: "#B28228" }}>{count}</span>;
  };

  return (
    <div>
      {/* Hero Section with Parallax Background */}
      <div
        style={{
          margin: "40px auto",
          maxWidth: 1000,
          width: "90%",
          minHeight: "80vh",
          borderRadius: 15,
          padding: "40px 20px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
          backgroundColor: "#FFF9F0",
        }}
      >
        {/* Background Parallax Layer */}
        <div
          style={{
            position: "absolute",
            top: -scrollY * 0.1,
            left: -scrollY * 0.05,
            width: "120%",
            height: "120%",
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            opacity: 0.1,
            zIndex: 0,
          }}
        ></div>

        {/* Left Text */}
        <div style={{ flex: "1 1 400px", minWidth: 300, zIndex: 1 }}>
          <h1 style={{ fontWeight: "bold", color: "#8C8C8C", fontSize: 15, fontFamily: "Poppins" }}>
            Check Out Our Latest Creations!
          </h1>
          <h4 style={{ margin: "32px 0 0", fontWeight: "bold", fontSize: 32, color: "#B28228" }}>
            Turning Everyday Waste <br /> into Something Special
          </h4>
          <p style={{ color: "#666", marginTop: 16 }}>
            We transform ordinary materials into extraordinary handmade pieces. Every creation tells a story of care, creativity, and sustainability.
          </p>
  <Link to="/tutorial">
  <button
    style={{
      background: "linear-gradient(90deg, #B28228, #FFC57B)",
      padding: "12px 28px",
      borderRadius: 8,
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: 20,
      transition: "all 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    Get Started
  </button>
</Link>


          {/* Stats */}
          <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
            {stats.map((s, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <AnimatedCounter value={s.value} />
                <p style={{ margin: 0, fontSize: 14, color: "#666" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Feature Cards */}
        <div style={{ flex: "1 1 400px", minWidth: 300, zIndex: 1 }}>
          <Slider {...sliderSettings}>
            {features.map((f, index) => (
              <div key={index} style={{ padding: 10 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <img src={f.icon} alt={f.title} style={{ width: 60, marginBottom: 10 }} />
                  <p style={{ fontWeight: "bold", color: "#B28228", fontSize: 18 }}>{f.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
=
      <div style={{ maxWidth: 1000, margin: "40px auto", padding: 30 }}>
        <h4 style={{ color: "#B28228", textAlign: "center", marginBottom: 20 }}>
          Featured Creations
        </h4>
        <Slider {...sliderSettings}>
          {featuredProducts.map((p) => (
            <div key={p.id} style={{ padding: 10 }}>
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  background: "#FFF9F0",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12 }}
                />
                <h5 style={{ marginTop: 10, color: "#B28228" }}>{p.title}</h5>
                <p style={{ fontSize: 14, color: "#666" }}>{p.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div style={{ maxWidth: 900, margin: "40px auto", display: "flex", gap: 30, justifyContent: "space-around" }}>
        {steps.map((s, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <img src={s.icon} alt={s.title} style={{ width: 80, marginBottom: 10 }} />
            <h5 style={{ color: "#B28228" }}>{s.title}</h5>
            <p style={{ color: "#666", fontSize: 14 }}>{s.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div
        style={{
          margin: "60px auto",
          padding: 40,
          maxWidth: 1000,
          textAlign: "center",
          borderRadius: 15,
          background: "linear-gradient(90deg, #B28228, #FFC57B)",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: "bold" }}>Start Upcycling Today!</h2>
        <p style={{ margin: "10px 0 20px" }}>Join our community and create beautiful, sustainable products.</p>
      <Link to="/product">
  <button
    style={{
      background: "#fff",
      color: "#B28228",
      padding: "12px 28px",
      borderRadius: 8,
      border: "none",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    See Recycled Products
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