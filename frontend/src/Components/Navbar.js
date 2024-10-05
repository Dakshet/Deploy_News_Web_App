import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logoImage from '../Images/logo.jpg'
import SearchBar from './SearchBar'
import NewsContext from '../Context/News/NewsContext'
import { useDispatch, useSelector } from 'react-redux'
import { storeUserLogin } from '../redux/counter/counterSlice'
import UserProfile from './UserProfile'
import DropDownAddMenu from './DropDownAddMenu'


const Navbar = ({ showAddMenu, setShowAddMenu, showProfile, setShowProfile, showSearch, setShowSearch, showAlert }) => {

    const navigate = useNavigate();
    const { setSearchNewsResult, setSpecificNews } = useContext(NewsContext);
    const [mobileMenu, setMobileMenu] = useState(false);
    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const dispatch = useDispatch();
    const location = useLocation();
    const articleId = location.pathname.split("/")[3] || ""; // This will safely handle paths without a third segment

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
    }

    const handleClick = () => {
        setMobileMenu(false);
        setSearchNewsResult([]);
        setSpecificNews({});
    }

    const handleLogout = () => {
        localStorage.removeItem("inews")
        navigate('/');
        dispatch(storeUserLogin({}));
        setMobileMenu(false);
        showAlert("Logout successfully!", "success");
        setShowAddMenu(false);
        setShowProfile(false);
    }

    const handleUserProfile = () => {
        setShowProfile(!showProfile)
        setShowAddMenu(false);
    }

    const handleShowAddMenu = () => {
        setShowAddMenu(!showAddMenu)
        setShowProfile(false);
    }

    const isUserIsNotLogin = Object.keys(userLoginRedux).length === 0;


    return (
        <>
            <div className="navbar">

                <div className="navbar-left">
                    <Link to="/"><img className='logoNavbar' src={logoImage} alt="Industrial Times Logo" /></Link>
                </div>
                <div className='navbar-center'>
                    <ul className={`${mobileMenu ? "" : "navbarCenterHide"} `}>
                        <li className={`hideField ${isUserIsNotLogin ? "hideLogin" : ""}`}>
                            <img src={userLoginRedux.profileImageURL} alt="profile" />
                        </li>
                        <li className={`hideField ${isUserIsNotLogin ? "hideLogin" : ""}`}>
                            <span>{userLoginRedux.name}</span>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === '/' ? 'activeNav' : ''}`}>
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/snews/news/${articleId}` ? 'activeNav' : location.pathname === '/news' ? 'activeNav' : ''}`}>
                            <Link to="/news">News</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/snews/article/${articleId}` ? 'activeNav' : location.pathname === '/article' ? 'activeNav' : ''}`}>
                            <Link to="/article">Article</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/snews/interview/${articleId}` ? 'activeNav' : location.pathname === '/interview' ? 'activeNav' : ''}`}>
                            <Link to="/interview">Interview</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/snews/event/${articleId}` ? 'activeNav' : location.pathname === '/event' ? 'activeNav' : ''}`}>
                            <Link to="/event">Event</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === '/magazine' ? 'activeNav' : ''}`}>
                            <Link to="/magazine">Magazine</Link>
                        </li>
                        <li onClick={handleShowAddMenu} className={`${mobileMenu ? "hideAddBtn" : (isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" ? (location.pathname === "/addnews" ? "activeNav" : "") : "hideLogin"))}`}>
                            <div className="dropDownBox">
                                <p>Add</p>
                                <i id='downDownBoxIcon' className="ri-arrow-down-s-line"></i>
                            </div>
                        </li>
                        <li onClick={() => setShowSearch(!showSearch)} className='hideSearchBarIcon'>
                            <i className="ri-search-line"></i>
                        </li>
                        <li onClick={handleClick} className={`hideField ${isUserIsNotLogin ? "hideLogin" : (location.pathname === '/addnews' ? 'activeNav' : '')}`}>
                            <Link to="/addnews">Add News</Link>
                        </li>
                        <li onClick={handleClick} className={`hideField ${isUserIsNotLogin ? "hideLogin" : (location.pathname === '/addmagazine' ? 'activeNav' : '')}`}>
                            <Link to="/addmagazine">Add Magazine</Link>
                        </li>
                        <li onClick={handleClick} className={`hideField ${isUserIsNotLogin ? "" : "hideLogin"}`}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={`hideField ${isUserIsNotLogin ? "hideLogin" : ""}`} onClick={handleLogout}>
                            Logout
                        </li>
                        <li>
                            <div className="socialMediaIconx hideField">
                                <Link target='_blank' to="www.industrialtimes24@gmail.com"><i className="ri-mail-line"></i></Link>
                                <Link target='_blank' to="https://youtube.com/@industrialtimes24?si=n67pYl2TJSSpb0bD"><i className="ri-youtube-line"></i></Link>
                                <Link target='_blank' to="https://www.linkedin.com/in/industrial-times-7ab62431a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="ri-linkedin-box-line"></i></Link>
                                <Link target='_blank' to="https://www.facebook.com/"><i className="ri-facebook-box-line"></i></Link>
                                <Link target='_blank' to="https://www.instagram.com/"><i className="ri-instagram-line"></i></Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <ul>
                        <img onClick={handleUserProfile} src={userLoginRedux.profileImageURL} alt="" />
                        <li className={`${isUserIsNotLogin ? "hideLogin" : ""}`} onClick={handleLogout}>
                            Logout
                        </li>
                        <li className={`${isUserIsNotLogin ? (location.pathname === "/signup" ? "hideLogin" : "") : "hideLogin"}`}>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li className={`${isUserIsNotLogin ? (location.pathname === "/login" ? "hideLogin" : "") : "hideLogin"}`}>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>

                <i onClick={() => setShowSearch(!showSearch)} className="ri-search-line showSearchBar"></i>
                <i className="ri-menu-fill menu-icon" onClick={toggleMenu}></i>
            </div >
            <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
            <UserProfile showProfile={showProfile} />
            <DropDownAddMenu showAddMenu={showAddMenu} setShowAddMenu={setShowAddMenu} />
        </>
    )
}

export default Navbar
