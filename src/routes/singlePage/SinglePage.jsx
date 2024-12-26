import React from "react";
import "./singlePage.css";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import profile from "../../assets/profile.jpg";
import pin from '../../../public/pin.png'
import utility from '../../../public/utility.png'
import pet from '../../../public/pet.png'
import fee from '../../../public/fee.png'
import size from '../../../public/size.png'
import bed from '../../../public/bed.png'
import bath from '../../../public/bath.png'
import chat from '../../../public/chat.png'
import save from '../../../public/save.png'
import school from '../../../public/school.png'
function SinglePage() {
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title }</h1>
                <div className="address">
                  <img src={pin} alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">₹ {singlePostData.price}</div>
              </div>
              <div className="user">
                <img src={profile} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="botCol">
              <div className="bottom ">
                <h2>{singlePostData.descriptionTitle}</h2>
              </div>
              <span className="phrase ">
                <p>{singlePostData.descriptionPhrase}</p>
              </span>
              <br /><br />
              <ul className="placeFeatures">
                <li>Located just 200m from a petrol pump, near the engineering college.</li>
                <li>Proximity to 11th and 12th science colleges..</li>
                <li>Close to a new English medium school.</li>
                <li>Galaxy Mall just a 5-minute drive away.</li>
                <li>Ample water availability.</li>
                <li>Highway touch location (Karad-Solapur).</li>
                <li>Adjacent to the serene Krishna Temple.</li>
                <li>Nestled at the edge of natural water flow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src={utility} alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src={pet} alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src={fee} alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src={size} alt="" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src={bed} alt="" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src={bath} alt="" />
              <span>1 bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src={school} alt="" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src={pet} alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src={fee} alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src={chat} alt="" />
              Send a Message
            </button>
            <button>
              <img src={save} alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SinglePage;
