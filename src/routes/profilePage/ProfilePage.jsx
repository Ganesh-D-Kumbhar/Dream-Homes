import React from 'react'
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import './profilePage.css'
import profile from '../../assets/profile.jpg'
function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Ganesh Kumbhar</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              <b>Avatar:</b>
              <img
                src={profile}
                alt=""
              />
            </span>
            <span>
            <b>  Username: </b> <p>ganesh-d-kumbhar</p>
            </span>
            <span>
            <b>  E-mail: </b> <p>ganeshhh2003@gmail.com</p>
            </span>
          </div>
          <div className="title">
            <h1>Some Beautiful Homes</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage