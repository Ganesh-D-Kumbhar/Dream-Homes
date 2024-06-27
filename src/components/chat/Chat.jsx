import React, { useState } from "react";
import "./chat.css";
import dk from "../../assets/dk.jpeg";
import sl from "../../assets/sl.jpeg";
import od from "../../assets/od.jpeg";
import gk from "../../assets/gk.jpeg";
import vk from "../../assets/vk.jpeg";
import sr from "../../assets/sr.jpeg";
import ac from "../../assets/ac.jpeg";
function Chat() {
  const [chat, setChat] = useState(true);
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <br />
        <br />
        <div className="message">
          <img src={gk} alt="" />
          <div className="info">
            <div className="nameMsg">
              <span>Ganesh</span>
              <p>Hello Brother I am...</p>
            </div>
            <span>08:44 am</span>
          </div>
        </div>
        <div className="message">
          <img src={vk} alt="" />
          <div className="info">
            <div className="nameMsg">
              <span>Vitthal Kachare</span>
              <p>Where are you curre...</p>
            </div>
            <span>07:04 am</span>
          </div>
        </div>
        <div className="message">
          <img src={od} alt="" />
          <div className="info">
            <div className="nameMsg">
              <span>Onkar Dingane</span>
              <p>I am currently working...</p>
            </div>
            <span>07:00 am</span>
          </div>
        </div>
        <div className="message">
          <img src={sl} alt="" />
          <div className="info">
            <div className="nameMsg">
              <span>Suraj Lamkane</span>
              <p>I am learning CCNA at...</p>
            </div>
            <span>06:55 am</span>
          </div>
        </div>
        <div className="message">
          <img src={sr} alt="" />
          <div className="info">
            <div className="nameMsg">
              <span>Suraj Rathod</span>
              <p> Family Business...</p>
            </div>
            <span>06:30 am</span>
          </div>
        </div>
        <div className="message">
          <img src={ac} alt="" />
          <div className="info">
            <div className="nameMsg">
              <span>Anand Chaugule</span>
              <p>Workin at MNC...</p>
            </div>
            <span>Yesterday</span>
          </div>
        </div>
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={dk} alt="" style={{ height: "70px", width: "70px" }} />
              Digambar Kumbhar
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            <div className="chatMessage">
              <p>Hii</p>
              <span>08:58 pm</span>
            </div>
            <div className="chatMessage own">
              <p>Hello</p>
              <span>09:02 pm</span>
            </div>
            <div className="chatMessage">
              <p>Kuthe aahes aata?</p>
              <span>09:05 pm</span>
            </div>
            <div className="chatMessage own">
              <p>Ghari aahe kaa re?</p>
              <span>09:05 pm</span>
            </div>
            <div className="chatMessage">
              <p>Mala thode paise invest karayache hote.</p>
              <span>09:06 pm</span>
            </div>
            <div className="chatMessage own">
              <p>
                Are mst ch ki mg. Ek kam kr tu "Dream Homes" ya website wr bgh
                ekhadi property
              </p>
              <span>09:07 pm</span>
            </div>
            <div className="chatMessage">
              <p>Ha are me pn aikalay tyabaddal</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Ok thik aahe mg bgh. Boluya nantar.</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Ok, n Thank You</p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="bottom">
            <textarea id="txtarea"></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Chat;
