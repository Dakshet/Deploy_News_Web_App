import React, { useCallback, useContext } from 'react'
import "./AdminPage.css"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewsContext from '../Context/News/NewsContext';
import GoToPreviousePage from '../Components/GoToPreviousePage';

const AdminPage = () => {
    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const { setSearchNewsResult, setSpecificNews } = useContext(NewsContext);

    const handleClick = useCallback(() => {
        setSearchNewsResult([]);
        setSpecificNews({});
    }, [])


    const isUserIsNotLogin = Object.keys(userLoginRedux).length === 0;
    return (
        <>
            <GoToPreviousePage />
            <div className='adminPage'>
                {
                    userLoginRedux.role === "REPORTER" ? (
                        <div className="adminPageInner">
                            <img src={userLoginRedux.profileImageURL} alt="" />
                            <h1>{userLoginRedux.name}</h1>
                            <ul className='adminPageInnerList'>
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
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className='adminPageBtn'>Login</Link>
                    )
                }

            </div>
        </>
    )
}

export default AdminPage
