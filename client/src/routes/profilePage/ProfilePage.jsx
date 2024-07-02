import React from 'react'
import './profilePage.scss'
import List from '../../components/list/List'
import Chat from '../../components/chat/Chat'

function ProfilePage() {
  return (
    <div className='profilePage'>
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>Avatar:
              <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </span>
            <span>Username: <b>Jane Doe</b></span>
            <span>email: <b>jane@gmail.com</b></span>
          </div>
          <div className="title">
            <h1>My List</h1>
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
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage