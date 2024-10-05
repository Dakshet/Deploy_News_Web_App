import React, { useContext, useEffect } from 'react'
import "./News.css"
import NewsContext from '../Context/News/NewsContext'
import NewsItem from '../Components/NewsItem'
import { useNavigate } from 'react-router-dom'

const News = ({ showProfile, showAddMenu }) => {

    const navigate = useNavigate();

    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);


    useEffect(() => {
        fetchPageSpecificNews("NEWS");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - News";  // Set the document title to the news title
    }, []);


    const handleClick = (id, tag) => {
        navigate(`/snews/${(tag).toLowerCase()}/${id}`);
    }


    //Date Formatting|
    const formattedDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }



    // Time Formatting
    const formattedTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        }).replace(/\u202f/g, ' ');
    }



    if (!pageNews || pageNews.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <div className={`news ${showProfile ? "userMenu" : ""} ${showAddMenu ? "showMenu" : ""}`}>
            <div className="newsContainer">
                <h3>News</h3>
                <hr />
                <div className="newsContainerInner">
                    {pageNews[0] &&
                        <div onClick={() => handleClick(pageNews[0]._id, pageNews[0].tag)} className="newsParticularBoxFirst">
                            <img src={pageNews[0].coverImageURL} alt="" />
                            <h5>{pageNews[0].title.split(" ").slice(0, 18).join(" ") + "..."}</h5>
                            <div className="newsParticularTimeDateFirst">
                                <p>{formattedDate(pageNews[0].createdAt)}</p>
                                <p>{formattedTime(pageNews[0].createdAt)}</p>
                            </div>
                        </div>}
                    {pageNews && pageNews.map((pNews) => {
                        if (pageNews[0]._id !== pNews._id) {
                            return <NewsItem key={pNews._id} pNews={pNews} />
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    )
}

export default News
