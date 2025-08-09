
import React from "react";
import Header from "../Header";

function Contact(){
    return <>
    <Header/>
    
    <div style={{height:"150px", width:"100%"}}>
        <img src="/images/conatctpage.jpg" style={{backgroundSize:"contain",width:"100vw",height:"310px"}}/>
    </div>
    
    <div className="contact-container"style={{margin:"500px"}}>
        <div className="contact-info">
            <h3>Address</h3>
            <p>236 4th Floor Mangal CIty<br/>Indore</p>

            <h3>Phone</h3>
         <p>Mobile:8998999</p>

         <h3>Working Time</h3>
         <p>Monday-Friday: 9:00-22:00</p>
        </div>

        <form className="contact-form">
            <h2>Get In Touch With Us</h2>
            <p className="subtext">Please feel free to drop us an email .Our is here to help</p>

            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address"/>
            <input type="text" placeholder="SUbject(optional)"/>
            <textarea placeholder="Hii!  I'd like to ask about"></textarea>
        <button type="submit">Submit</button>
        </form>

    </div>

    {/* <div>
<h1 style={{marginTop:"190px", textAlign:"center"}}>Get in touch</h1>
<h5 style={{fontWeight:"100",textAlign:"center",color:"grey",fontSize:"15px"}}>For More Information About Our Product & Services. Please Feel Free To Drop Us<br/> An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</h5>
</div>

<div style={{marginLeft:"30px",marginTop:}}>
<div >
    <h4 >Address</h4>
    <h6>236 4th Floor Mangle City,Indore</h6>
<div>
    <div style={{textAlign:"right",marginRight:"30px",marginTop:"10px"}}>
        <label>Your Name</label>
    <input type="text" placeholder="Enter your Name"/>
</div>

    </div>
    <h4>Phone</h4>
    <h6>Mobile:78778787890</h6>
    <label>Your Name</label>
    <input type="email" placeholder="Enter your Email Address"/>
</div>

<div>
    <h4>Working Time</h4>
    <h6>Monday-Friday:9:00-22:00</h6>
    <label>Your Name</label>
    <input type="Subject" placeholder="This is an optional"/>
</div>

<div>
    {/* <h4>Message</h4> */}
    {/* <label>Message</label>
    <input type="Subject" placeholder="Hii i'd like to ask about"/>
</div>

<div style={{ marginTop:"25px", width: "200px", height: "60px",fontSize:"30px",alignItems:"center",textAlign:"center"}}>
<button type="button"> Submit</button>
</div>

</div> */} 


    </>
}

export default Contact;