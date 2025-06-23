import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./contact.css";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  const openContact = () => {
    setIsVisible(true);
  };

  const closeContact = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="contactContainer">
        <div className="contactContent">
          <h1>Connect with Dream Homes</h1>
          <p>
            We're excited to help you on your journey to finding the perfect home. Whether you have questions, need assistance, or just want to learn more about our services, our team is here to help.
          </p>
          <div className="contactButtons">
            <button onClick={openContact}>Contact Us</button>
            <Link to="/home">
              <button>Get Started</button>
            </Link>
          </div>
          <div className="extraContent">
            <div className="feature">
              <img src="https://i.pinimg.com/736x/1b/ee/f7/1beef79c0678fdefc5ea24852d81393b.jpg" alt="Customer Support" />
              <h4>24/7 Customer Support</h4>
              <p>Our dedicated support team is available around the clock to assist you with any questions or issues you may have.</p>
            </div>
            <div className="feature">
              <img src="https://img.freepik.com/free-vector/professional-consulting-service-research-recommendation-idea-strategy-management-troubleshooting-help-clients-with-business-problems-isolated-flat-vector-illustration_613284-1560.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=ais_user" alt="Expert Consultation" />
              <h4>Expert Consultation</h4>
              <p>Get personalized advice from our real estate experts. We offer tailored consultations to help you make informed decisions.</p>
            </div>
            <div className="feature ">
              <img src="https://blog.closethegapfoundation.org/content/images/size/w500/2023/12/community-insights.png" alt="Community Insights" />
              <h4>In-Depth Community Insights</h4>
              <p>Discover valuable information about neighborhoods, schools, and amenities to find the perfect community for your lifestyle.</p>
            </div>
            <div className="feature">
              <img src="https://img.freepik.com/free-vector/process-concept-illustration_114360-4307.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721692800&semt=ais_user" alt="Seamless Process" />
              <h4>Smooth and Seamless Process</h4>
              <p>Experience a hassle-free home-buying process with our streamlined approach, from property search to closing.</p>
            </div>
            <div className="feature lastFeature">
              <img src="https://www.stormshield.com/wp-content/uploads/shutterstock-1079765807.jpg" alt="Trusted Network" />
              <h4>Trusted Network</h4>
              <p>Benefit from our extensive network of trusted professionals, ensuring you receive top-notch service throughout your journey.</p>
            </div>
            
          </div>
        </div>
        <div className="copyright">
            <p>All rights reserved &copy; Ganesh Kumbhar</p>
          </div>
      </div>

      <div className={`contactForm ${isVisible ? "visible" : ""}`}>
        <form
          action="https://api.web3forms.com/submit"
          method="post"
          target="_blank"
        >
          <input
            type="hidden"
            name="access_key"
            value="f0d51e85-7006-4ad4-a4ec-86330d610401"
          />
          <div className="formHeader">
            <h2>Contact Us</h2>
            <h2 onClick={closeContact} className="closeButton">×</h2>
          </div>
          <div className="formField">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" required />
          </div>
          <div className="formField">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="formField">
            <label htmlFor="message">Message</label>
            <textarea name="message" required></textarea>
          </div>
          <div className="formField">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms" id="termLabel">I agree to the terms and conditions</label>
          </div>
          <div className="formActions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
