import React, { useState } from "react";
import "./chat.css";
import dk from "../../assets/dk.jpeg";
import sl from "../../assets/sl.jpeg";
import od from "../../assets/od.jpeg";
import gk from "../../assets/gk.jpeg";
import vk from "../../assets/vk.jpeg";
import sr from "../../assets/sr.jpeg";
import ac from "../../assets/ac.jpeg";

const users = [
  { id: "dk", name: "Digambar Kumbhar", img: dk },
  { id: "vk", name: "Vitthal Kachare", img: vk },
  { id: "od", name: "Onkar Dingane", img: od },
  { id: "sl", name: "Suraj Lamkane", img: sl },
  { id: "sr", name: "Suraj Rathod", img: sr },
  { id: "ac", name: "Anand Chaugule", img: ac }
];

function Chat() {
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState({});

  const addMsg = () => {
    if (!chatUser) return;
    let msg = document.getElementById("txtarea").value;
    const now = new Date();
    const hr = now.getHours();
    const min = now.getMinutes();
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hr % 12 || 12}:${min < 10 ? '0' + min : min} ${ampm}`;

    if (msg.trim()) {
      const newMsg = { text: msg, time: formattedTime, own: true };
      setMessages(prevMessages => ({
        ...prevMessages,
        [chatUser]: [...(prevMessages[chatUser] || []), newMsg],
      }));
      document.getElementById("txtarea").value = "";
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <br />
        <br />
        {users.map(user => {
          const lastMessage = messages[user.id]?.slice(-1)[0];
          const lastMessageTime = lastMessage ? lastMessage.time : "";

          return (
            <div key={user.id} className="message" onClick={() => setChatUser(user.id)}>
              <img src={user.img} alt={user.name} />
              <div className="info">
                <div className="nameMsg">
                  <span>{user.name}</span>
                  <p>{lastMessage ? lastMessage.text : "Start Conversation"}</p>
                </div>
                <span>{lastMessageTime}</span>
              </div>
            </div>
          );
        })}
      </div>

      {chatUser && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={users.find(user => user.id === chatUser).img} alt="" style={{ height: "70px", width: "70px" }} />
              {users.find(user => user.id === chatUser).name}
            </div>
            <span className="close" onClick={() => setChatUser(null)}>X</span>
          </div>
          <div className="center">
            {(messages[chatUser] || []).map((msg, index) => (
              <div key={index} className={`chatMessage ${msg.own ? "own" : ""}`}>
                <p>{msg.text}</p>
                <span>{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="bottom">
            <textarea id="txtarea"></textarea>
            <button id="send" onClick={addMsg}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
