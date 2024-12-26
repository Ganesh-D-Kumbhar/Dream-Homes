import React from "react";
import "./homePage.css";
import SearchBar from "../../components/searchBar/SearchBar";
import bg from "../../../public/bg.png";
function HomePage() {
  return (
    <>
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Discover Your Ideal Home..!</h1>
            <span>Welcome to Dream Homes! 
                  Ready to find your dream home? Browse our stunning listings and discover the perfect place to call your own. Whether buying, selling, or renting, our expert team is here to help you every step of the way. Start your journey with Dream Homes today!
            </span>
            <SearchBar />
            <div className="boxes">
              <div className="box b1">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box b2">
                <h1>100+</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box b3">
                <h1>2000+</h1>
                <h2>Properties Ready</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src={bg} alt="" />
        </div>
      </div>
    </>
  );
}
export default HomePage;
