import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss'
import { AuthContext } from '../../context/AuthContext';

function Navbar() {

  const {currentUser} = useContext(AuthContext)

  const [open, setOpen] = useState(false)

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
            currentUser ? (
              <div className="user">
                <img src={currentUser.data.avatar || "/noavatar.jpg"} alt="" />
                <span>{currentUser.data.username}</span>
                <Link to='/profile' className='profile'>
                  <div className="notification">3</div>
                  <span>Profile</span>
                </Link>
              </div>
            ) : (
            <>
              <a href="/login">Sign in</a>
              <a href="/register" className='register'>Sign up</a>
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
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
          </div>
        </div>
    </nav>
  )
}

export default Navbar