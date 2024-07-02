import React, { useState } from 'react'
import './chat.scss'

function Chat() {

    const [chat, setChat] = useState(true)

  return (
    <div className='chat'>
        <div className="messages">
            <h1>Messages</h1>
            <div className="message">
                <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Jane Doe</span>
                <p>
                    Lorem ipsum dolor sit amet ...
                </p>
            </div>
            <div className="message">
                <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Jane Doe</span>
                <p>
                    Lorem ipsum dolor sit amet ...
                </p>
            </div>
            <div className="message">
                <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Jane Doe</span>
                <p>
                    Lorem ipsum dolor sit amet ...
                </p>
            </div>
            <div className="message">
                <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Jane Doe</span>
                <p>
                    Lorem ipsum dolor sit amet ...
                </p>
            </div>
            <div className="message">
                <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Jane Doe</span>
                <p>
                    Lorem ipsum dolor sit amet ...
                </p>
            </div>
        </div>

        {chat && 
            <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        Jane Doe
                    </div>
                    <span className="close" onClick={()=> setChat(null)}>X</span>
                </div>
                <div className="center">
                    <div className="chatMessage">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>lorem ipsum dolor sit amet</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className="bottom">
                    <textarea></textarea>
                    <button>Send</button>
                </div>
            </div>
        }
    </div>
  )
}

export default Chat