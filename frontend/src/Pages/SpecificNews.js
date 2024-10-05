import React, { useContext, useEffect, useState } from 'react'
import NewsContext from '../Context/News/NewsContext'
import "./SpecificNews.css"
import { useLocation, useNavigate } from "react-router-dom"
import UpdateNews from '../Components/UpdateNews'
// Second copy this import
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon
} from "react-share";
import Comments from '../Components/Comments'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

const SpecificNews = ({ showAddMenu, showAlert, showProfile }) => {

    const shareUrl = window.location.href;
    // const shareUrl = "https://www.youtube.com";
    const navigate = useNavigate();
    const location = useLocation();
    const { specificNews, getNewsUsingId, deleteNews } = useContext(NewsContext);
    const [currentNews, setCurrentNews] = useState();
    const [updateModal, setUpdateModal] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const isUserIsNotLogin = Object.keys(userLoginRedux).length === 0;


    //Method call when we go to the new route
    useEffect(() => {
        getNewsUsingId(location.pathname.split("/")[3]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        if (specificNews?.title) {
            document.title = specificNews.title;  // Set the document title to the news title
        } else {
            document.title = "INDUSTRIAL TIMES";  // Default title if the news title is not available
        }
    }, [specificNews]);



    //Delete news
    const handleDeleteNews = (news) => {
        showAlert("Deleted News Successfully!", "success");
        navigate(`/${(news.tag).toLowerCase()}`);
        deleteNews(news._id, news.coverImageURL);
    }


    //Update News
    const handleUpdateNews = (currentNew) => {
        setCurrentNews(currentNew);
        setUpdateModal(true);
    }


    //Adjust height of share icon.
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
    // const isMediumScreen = useMediaQuery({ query: '(max-width: 900px)' });
    // const isLargeScreen = useMediaQuery({ query: '(min-width: 901px) and (max-width: 1200px)' });
    const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 600px)' });

    let size;
    if (isSmallScreen) {
        size = 30;
    } else if (isExtraLargeScreen) {
        size = 40;
    }


    //Date Formating Here   
    const date = new Date(specificNews.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Format time
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).replace(/\u202f/g, ' ');


    if (!specificNews || specificNews.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <>
            <UpdateNews showAlert={showAlert} currentNews={currentNews} updateModal={updateModal} setUpdateModal={setUpdateModal} />
            <div className={`specificNews ${showProfile ? "userMenu" : ""}${showAddMenu ? "showMenu" : ""}`}>
                <div className="specificNewsInner">
                    <h1>{specificNews.title}</h1>
                    <div className="specificTimeZone">
                        <p>Updated:</p>
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                    </div>
                    <img className='specificNewsImage' src={specificNews.coverImageURL} alt="" />
                    {/* <pre className='specificPara'>{specificNews.body}</pre> */}
                    <p className='specificPara' dangerouslySetInnerHTML={{ __html: specificNews.body }}></p>
                    <div className="specificIcon">
                        <div className="specificIconInner">
                            <i onClick={() => handleUpdateNews(specificNews)} className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" && userLoginRedux._id === specificNews.createdUser ? ("ri-edit-box-line hoverIcon") : "")}`}></i>
                            <p className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" ? "hoverText" : "hideLogin")}`}>Edit</p>
                        </div>
                        <div className="specificIconInner">
                            <i onClick={() => setShareModal(!shareModal)} className="ri-share-line hoverIcon"></i>
                            <p className='hoverText'>Share</p>
                        </div>
                        <div className="specificIconInner">
                            <i onClick={() => { handleDeleteNews(specificNews) }} className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" && userLoginRedux._id === specificNews.createdUser ? ("ri-delete-bin-6-line hoverIcon") : "")}`}></i>
                            <p className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" ? "hoverText" : "hideLogin")}`}>Delete</p>
                        </div>

                        <div className={`${shareModal ? "shareOption" : "hideSocialMenu"} `}>
                            <FacebookShareButton url={shareUrl} hashtag='news'>
                                <FacebookIcon size={size} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton url={shareUrl} title={specificNews.title} hashtag="news">
                                <WhatsappIcon size={size} round={true} iconFillColor="white" style={{ marginLeft: "10px" }} />
                            </WhatsappShareButton>
                            <TwitterShareButton url={shareUrl} title={specificNews.title} hashtag="news">
                                <TwitterIcon size={size} round={true} iconFillColor="white" style={{ marginLeft: "10px" }} />
                            </TwitterShareButton>
                            <EmailShareButton url={shareUrl} subject="Share this news" body={specificNews.title}>
                                <EmailIcon size={size} round={true} style={{ marginLeft: "10px" }} />
                            </EmailShareButton>
                        </div>
                    </div>

                </div>
                <hr />
            </div >
            <Comments showAlert={showAlert} />
        </>
    )
}

export default SpecificNews
