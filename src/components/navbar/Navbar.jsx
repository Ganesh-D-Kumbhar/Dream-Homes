import React, { useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import gk from '../../assets/profile.jpg'
function Navbar() {
   const[open, setOpen] = useState(false)
   const user = true
  return (
    <nav>
        <div className="left">
            <a href="#" className='logo' id="logo">
                <img src="/public/logo.png" alt="" style={{height: '80px', width: "80px"}} />
            </a>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Agents</a>
        </div>
        <div className="right">
            {user?(
                <div className="user">
                    <img src={gk} alt="" />
                    <span>Dream Homes</span>
                    <Link to="/profile" className='profile'>
                        <div className="notification">3</div>
                        <span>Profile</span>
                    </Link>
                </div>
            ):(
                <>
                <a href="/">Sign in</a>
            <a href="/" className='register'>Sign up</a>
                </>
            )}
            <div className="menuIcon">
                <img src="/public/menu.png" alt="" 
                onClick={()=>setOpen((prev)=>!(prev))}
                />
            </div>
            <div className={open?"menu active":"menu"}>
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