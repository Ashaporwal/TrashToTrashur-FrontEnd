// import Footer from "../Footer";
import Header from "../Header";
import "./DefaultView.css"
import 'bootstrap/dist/css/bootstrap.min.css';
function DefaultView() {
  return <>
    <Header />

    <div style={{ backgroundColor: "#FFF4E0", minHeight: "80vh", textAlign: "center" }}>
      <h1 style={{ fontSize: "70px", textAlign: "center", marginTop: "100px", width: "100%", fontFamily: "'Cinzel', serif",  letterSpacing: "2px",textShadow: "2px 2px 4px rgba(0,0,0,0.3)",animation: "fadeInUp 1s ease-out",borderColor:"none" }}>Turn Trash Into<br />
        Treasure</h1>
        
        
      <h5 style={{ textAlign: "center", fontWeight: "100" }}>Join a global community of eco-conscious makers transforming everyday waste into beautiful, sustainable art. Learn, create, and make a positive impact on our planet</h5>
      <button style={{ height: "40px", width: "40xp", alignContent: "center", color: "white", backgroundColor: "#B88E2F", borderRadius: "11px",alignItems:"center" }}>Start Creating</button>
    </div>


    <div style={{ backgroundColor: "white", textAlign: "center" }}>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>Everything You Need to Create Sustainably</h1>

      From learning new techniques to selling your creations, TrashToTreasure<br /> provides all the tools and community support you need for your eco-creative journey.
    </div>

    <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "15px" }}>
      <div className="card" style={{ width: "20rem", backgroundColor: "#FFF4E0", border: "1px solid #B88E2F", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "20px" }}
      >
        <div className="card-body">
          <h5 className="card-title" style={{ color: "#5C4714", fontWeight: "bold" }}>
            Trash to Treasure
          </h5>
          <p className="card-text" style={{ color: "#7a6b45" }}>
            We turn waste materials into meaningful products and eco-crafts.
          </p>
          <a href="#" className="btn" style={{ backgroundColor: "#B88E2F", color: "#FFF4E0", fontWeight: "bold", }}
          >
            Learn More
          </a>
        </div>
      </div>



      <div className="card" style={{ width: "20rem", backgroundColor: "#FFF4E0", border: "1px solid #B88E2F", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "20px" }}
      >
        <div className="card-body">
          <h5 className="card-title" style={{ color: "#5C4714", fontWeight: "bold" }}>
            Trash to Treasure
          </h5>
          <p className="card-text" style={{ color: "#7a6b45" }}>
            We turn waste materials into meaningful products and eco-crafts.
          </p>
          <a href="#" className="btn" style={{ backgroundColor: "#B88E2F", color: "#FFF4E0", fontWeight: "bold", }}
          >
            Learn More
          </a>
        </div>
      </div>


      <div className="card" style={{ width: "20rem", backgroundColor: "#FFF4E0", border: "1px solid #B88E2F", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "20px" }}
      >
        <div className="card-body">
          <h5 className="card-title" style={{ color: "#5C4714", fontWeight: "bold" }}>
            Trash to Treasure
          </h5>
          <p className="card-text" style={{ color: "#7a6b45" }}>
            We turn waste materials into meaningful products and eco-crafts.
          </p>
          <a href="#" className="btn" style={{ backgroundColor: "#B88E2F", color: "#FFF4E0", fontWeight: "bold", }}
          >
            Learn More
          </a>
        </div>
      </div>




    </div>

    <div style={{ backgroundColor: "lightgreen", textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ paddingTop: "30px", }}>Ready to Make a Difference?</h1>
      <h5 style={{ fontWeight: "100", marginTop: "20px" }}>Join thousands of creators who are already transforming waste into<br /> wonder. Start your sustainable crafting journey today.</h5>

      <i className="fa-regular fa-heart"></i>  Community Driven
      <i className="fa-solid fa-leaf"></i>     Planet Positive

      <div style={{ alignItems: "center", borderRadius: "0px", marginTop: "5px" }}>
        <button type="button" style={{ borderRadius: "10px", backgroundColor: "#B88E2F" }}>Start Started For Free</button>
      </div>
    </div>
    {/* <Footer/> */}
  </>
}
export default DefaultView;