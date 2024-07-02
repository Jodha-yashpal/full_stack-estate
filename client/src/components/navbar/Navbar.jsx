import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss'

function Navbar() {

  const [open, setOpen] = useState(false)

  const user = true;

  return (
    <nav>
        <div className='left'>
          <a href="/" className='logo'>
            <img src="/logo.png" alt="" />
            <span>PngEstate</span>
          </a>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
        </div>
        <div className='right'>
          {
            user ? (
              <div className="user">
                <img src="https://images.pexels.com/photos/24375005/pexels-photo-24375005/free-photo-of-young-brunette-posing-among-tropical-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <span>Jane Doe</span>
                <Link to='/profile' className='profile'>
                  <div className="notification">3</div>
                  <span>Profile</span>
                </Link>
              </div>
            ) : (
            <>
              <a href="/">Sign in</a>
              <a href="/" className='register'>Sign up</a>
            </>)
          }
          <div className="menuIcon">
            <img src="/menu.png" alt="" 
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
          <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
          </div>
        </div>
    </nav>
  )
}

export default Navbar