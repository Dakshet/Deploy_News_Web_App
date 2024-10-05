import React from 'react'
import "./Logo.css"
import logo from '../Images/logo.jpg'
import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <>
            <div className='logo'>
                {/* <img src={logoImage} alt="" /> */}
                <div className="logoInner">
                    <img src={logo} alt="" />
                    <h2>Industrial <span>Times</span></h2>
                </div>
            </div>
            <div className="socialMediaIcon">
                <Link target='_blank' to="www.industrialtimes24@gmail.com"><i className="ri-mail-line"></i></Link>
                <Link target='_blank' to="https://youtube.com/@industrialtimes24?si=n67pYl2TJSSpb0bD"><i className="ri-youtube-line"></i></Link>
                <Link target='_blank' to="https://www.linkedin.com/in/industrial-times-7ab62431a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="ri-linkedin-box-line"></i></Link>
                <Link target='_blank' to="https://www.facebook.com/"><i className="ri-facebook-box-line"></i></Link>
                <Link target='_blank' to="https://www.instagram.com/"><i className="ri-instagram-line"></i></Link>
            </div>
        </>
    )
}

export default Logo