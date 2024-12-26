import React from "react";
import { useNavigate } from "react-router-dom";
import "./about.css";

export default function About() {
  let navg = useNavigate();
  const getStart = () => {
    navg("/home");
  };

  return (
    <>
      <div className="aboutContainer">
        <div className="box">
          <div className="information mob">
            <div className="welcome-container">
              <h1 className="welcome-title">Welcome to Dream Homes!</h1>
              <p className="welcome-description">
                At <span className="highlight">Dream Homes</span>, we believe
                that finding your perfect home should be an{" "}
                <span className="highlight">enjoyable</span> and{" "}
                <span className="highlight">stress-free</span> experience. Our
                team is dedicated to making your home-buying journey as smooth
                and exciting as possible. Discover{" "}
                <span className="highlight">
                  personalized home recommendations
                </span>{" "}
                tailored to your needs and take virtual tours from the comfort
                of your current location. Our{" "}
                <span className="highlight">expert agents</span> are here to
                guide you every step of the way, ensuring you feel{" "}
                <span className="highlight">confident</span> and{" "}
                <span className="highlight">informed</span>. Join us today and
                let's turn your <span className="highlight">dream home</span>{" "}
                into a reality!
              </p>
              <div className="extra-points">
                <div className="point">
                  <img
                    src="https://img.freepik.com/free-vector/digital-education-internet-conference-online-tech-talks-technical-topics-presentations-tech-webinars-live-technology-demonstration-concept-pinkish-coral-bluevector-isolated-illustration_335657-1252.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721779200&semt=ais_user"
                    alt="Personalized Recommendations"
                    className="icon"
                  />
                  <p>Personalized Home Recommendations</p>
                </div>
                <div className="point">
                  <img src="https://www.propertyfinder.ae/blog/wp-content/uploads/2020/04/3D-Tours-1-800x470.jpg" alt="Virtual Tours" className="icon" />
                  <p>Virtual Tours Available</p>
                </div>
                <div className="point">
                  <img src="https://ascuretech.com/img/industries-solution/real-estate-website-development-services.webp" alt="Expert Agents" className="icon" />
                  <p>Expert Agents to Assist You</p>
                </div>
              </div>
              <button onClick={getStart} className="cta-button">
                Get Started Today
              </button>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="information i2 why-dream-homes-container">
            <h1 className="section-title">Why Dream Homes?</h1>
            <div className="point">
              <img src="https://img.freepik.com/free-vector/honour-abstract-concept-vector-illustration-show-esteem-achievement-award-high-moral-principles-college-graduate-public-respect-medal-emblem-honour-memorial-noble-people-abstract-metaphor_335657-1420.jpg?size=338&ext=jpg&ga=GA1.1.1369675164.1715385600&semt=ais_user" alt="Trusted Experts" className="icon" />
              <p>
                <b>Trusted Experts:</b> Our passionate and experienced team is
                dedicated to guiding you through every step of your home-buying
                journey, ensuring you have all the information and support you
                need.
              </p>
            </div>
            <div className="point">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/real-estate-3727515-3135817.png?f=webp" alt="Cutting-Edge Tech" className="icon" />
              <p>
                <b>Cutting-Edge Tech:</b> We use innovative tools and technology
                to make your property search easy, efficient, and enjoyable.
                Explore properties through virtual tours and get personalized
                recommendations based on your preferences.
              </p>
            </div>
            <div className="point">
              <img src="https://thumbs.dreamstime.com/b/customer-first-round-ribbon-isolated-label-sign-sticker-193004081.jpg" alt="Customer First" className="icon" />
              <p>
                <b>Customer First:</b> Your satisfaction is our top priority. We
                strive to exceed your expectations in every aspect, from initial
                search to after-sales support. Our customer-centric approach
                ensures that your needs and preferences come first.
              </p>
            </div>
            <div className="point">
              <img src="https://img.freepik.com/premium-vector/man-holding-magnifying-glass_112255-913.jpg" alt="Quality Listings" className="icon" />
              <p>
                <b>Quality Listings:</b> We offer only the best properties,
                ensuring you have access to high-quality options that meet your
                needs. Our listings are meticulously curated to provide you with
                the finest selection of homes.
              </p>
            </div>
            <div className="point">
              <img src="https://blog.closethegapfoundation.org/content/images/size/w500/2023/12/community-insights.png" alt="Community Insights" className="icon" />
              <p>
                <b>Community Insights:</b> Gain valuable insights into
                neighborhoods, including schools, amenities, and local
                attractions. Our comprehensive information helps you choose the
                perfect community for your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
