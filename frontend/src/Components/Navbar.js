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
                        <li onClick={handleClick} className={`${location.pathname === `/snews/job/${articleId}` ? 'activeNav' : location.pathname === '/job' ? 'activeNav' : ''}`}>
                            <Link to="/job">Jobs</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === '/magazine' ? 'activeNav' : ''}`}>
                            <Link to="/magazine">Magazine</Link>
                        </li>
                        <li onClick={handleClick} className={`${(userLoginRedux.role === "REPORTER" ? (location.pathname === '/advertisement' ? 'activeNav' : '') : "hideLogin")}`}>
                            <Link to="/advertisement">Advertisement</Link>
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
                        <li onClick={handleClick} className={`hideField ${userLoginRedux.role === "REPORTER" ? (location.pathname === '/addnews' ? 'activeNav' : '') : "hideLogin"}`}>
                            <Link to="/addnews">Add News</Link>
                        </li>
                        <li onClick={handleClick} className={`hideField ${userLoginRedux.role === "REPORTER" ? (location.pathname === '/addmagazine' ? 'activeNav' : '') : "hideLogin"}`}>
                            <Link to="/addmagazine">Add Magazine</Link>
                        </li>
                        <li onClick={handleClick} className={`hideField ${userLoginRedux.role === "REPORTER" ? (location.pathname === '/add/advertisement' ? 'activeNav' : '') : "hideLogin"}`}>
                            <Link to="/add/advertisement">Add AD</Link>
                        </li>
                        <li onClick={handleClick} className={`hideField ${isUserIsNotLogin ? "" : "hideLogin"}`}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={`hideField ${isUserIsNotLogin ? "hideLogin" : ""}`} onClick={handleLogout}>
                            Logout
                        </li>
                        <li>
                            <div className="socialMediaIconx hideField">
                                <a
                                    href="https://wa.me/+918652654519?text=Hello%20Industrial%20Times!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="ri-whatsapp-line"></i>
                                </a>
                                <a
                                    href="mailto:industrialtimes24@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="ri-mail-line"></i>
                                </a>
                                <a href="https://youtube.com/@industrialtimes24?si=n67pYl2TJSSpb0bD" target="_blank" rel="noopener noreferrer">
                                    <i className="ri-youtube-line"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/industrial-times-7ab62431a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                                    <i className="ri-linkedin-box-line"></i>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61571226682075" target="_blank" rel="noopener noreferrer">
                                    <i className="ri-facebook-box-line"></i>
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="ri-instagram-line"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <ul>
                        <img className={`${isUserIsNotLogin ? "hideLogin" : ""}`} onClick={handleUserProfile} src={userLoginRedux.profileImageURL} alt="" />
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
