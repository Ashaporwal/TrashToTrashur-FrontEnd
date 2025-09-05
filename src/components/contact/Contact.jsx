import React from "react";
import Header from "../Header";
import "./Contact.css";

function Contact() {
  return (
    <>
      <Header />

      <div className="contact-banner">
        <img
          src="/icon/conatctpage.jpg"
          alt="Contact Banner"
          className="banner-img"
        />
      </div>

      <div className="contact-container">
  
        <div className="contact-info">
          <h2>Contact Info</h2>
          <div className="info-item">
            <h4>Address</h4>
            <p>236 4th Floor, Mangal City, Indore</p>
          </div>
          <div className="info-item">
            <h4>Phone</h4>
            <p>Mobile: 8998999</p>
          </div>
          <div className="info-item">
            <h4>Working Time</h4>
            <p>Monday - Friday: 9:00 - 22:00</p>
          </div>
        </div>

  
        <div className="contact-form-container">
          <h2>Get In Touch With Us</h2>
          <p className="subtext">
            Please feel free to drop us an email. Our team is here to help.
          </p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject (optional)" />
            <textarea placeholder="Hi! I'd like to ask about..." rows="5" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
