import React, { useContext, useEffect } from 'react'
import NewsContext from '../Context/News/NewsContext'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

const Home = ({ showProfile, showAddMenu }) => {

    const navigate = useNavigate();

    const { fetchNews, news } = useContext(NewsContext);

    const newss = news && news.filter(item => item.tag === "NEWS");
    const articles = news && news.filter(item => item.tag === "ARTICLE");
    const interviews = news && news.filter(item => item.tag === "INTERVIEW");
    const events = news && news.filter(item => item.tag === "EVENT");
    const magazines = news && news.filter(item => item.tag === "MAGAZINE");


    const handleClick = (id, tag) => {
        navigate(`/snews/${(tag).toLowerCase()}/${id}`);
    }

    const handleMagazine = (body) => {
        window.open(`${body}`, "_blank", "noreferrer");
    }




    useEffect(() => {
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES";  // Set the document title to the news title
    }, []);


    const formattedDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }


    // Time Formatting
    // const formattedTime = date.toLocaleTimeString('en-US', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     hour12: true,
    // }).replace(/\u202f/g, ' ');



    if (!news || news.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <>
            {/* <div className={`${spinner ? "circle" : ""}`}></div> */}
            <div className={`${showProfile ? "home" : ""} ${showAddMenu ? "showMenu" : ""}`} >
                {/* <div className={`${showProfile ? console.log(showProfile) : ""} ${showAddMenu ? console.log(showAddMenu) : ""}`} > */}
                <div className="container">
                    {/*Left side Add container using position absolute or position:fixed*/}
                    <div className="containerBox">
                        {newss.length !== 0 &&
                            <div className="newsBox homeBox">
                                <h3>News</h3>
                                <hr />
                                <div className="newsBoxContent">
                                    <div className="newsBoxContentLeft">
                                        <img src={newss[0].coverImageURL} alt="" />
                                        <p onClick={() => handleClick(newss[0]._id, newss[0].tag)}>{newss[0].title.split(" ").slice(0, 13).join(" ") + "..."}</p>
                                    </div>
                                    <div className="newsBoxContentRight">
                                        {newss[1] ?
                                            <div className="newsBoxRUp">
                                                <img src={newss[1].coverImageURL} alt="" />
                                                <p onClick={() => handleClick(newss[1]._id, newss[1].tag)}>{newss[1].title.split(" ").slice(0, 10).join(" ") + "..."}</p>
                                            </div> : ""}
                                        {newss[2] ?
                                            <div className="newsBoxRDown">
                                                <img src={newss[2].coverImageURL} alt="" />
                                                <p onClick={() => handleClick(newss[2]._id, newss[2].tag)}>{newss[2].title.split(" ").slice(0, 10).join(" ") + "..."}</p>
                                            </div> : ""}
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="articleAndInterviewBox homeBox">
                            {articles.length !== 0 &&

                                <div className="articleBox">
                                    <h3>Article</h3>
                                    <hr />
                                    <div className="articleBoxContent">
                                        <div className="articleBoxContentLeft">
                                            <img src={articles[0].coverImageURL} alt="" />
                                            <p onClick={() => handleClick(articles[0]._id, articles[0].tag)}>{articles[0].title.split(" ").slice(0, 8).join(" ") + "..."}</p>
                                        </div>
                                        <div className="articleBoxContentRight">
                                            {articles.map((newe) => {
                                                if (articles[0]._id !== newe._id) {
                                                    return <div onClick={() => handleClick(newe._id, newe.tag)} className="articleInnerBox" key={newe._id}>
                                                        <img src={newe.coverImageURL} alt="" />
                                                        <div>
                                                            <p>{newe.title.split(" ").slice(0, 6).join(" ") + "..."}</p>
                                                            {/* <small>25, May 2010</small> */}
                                                            <small>{formattedDate(newe.createdAt)}</small>
                                                        </div>
                                                    </div>
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                </div>}

                            {interviews.length !== 0 &&
                                <div className="interviewBox">
                                    <h3>Interview</h3>
                                    <hr />
                                    <div className="interviewBoxContent">
                                        {interviews.map((newe) => {
                                            return <div onClick={() => handleClick(newe._id, newe.tag)} key={newe._id}>
                                                {newe.tag === "INTERVIEW" && <div className="interviewInnerBox">
                                                    <img src={newe.coverImageURL} alt="" />
                                                    <p>{newe.title.split(" ").slice(0, 8).join(" ") + "..."}</p>
                                                    <small id='interviewTime'>{formattedDate(newe.createdAt)}</small>
                                                </div>}
                                            </div>
                                        })}
                                    </div>
                                </div>}
                        </div>

                        {events.length !== 0 &&
                            <div className="eventBox homeBox">
                                <h3>Event</h3>
                                <hr />
                                <div className="eventBoxContent">
                                    {events && events.map((newe) => {
                                        return <div onClick={() => handleClick(newe._id, newe.tag)} key={newe._id}>
                                            {newe.tag === "EVENT" && <div className="eventInnerBox">
                                                <img src={newe.coverImageURL} alt="" />
                                                <p>{newe.title.split(" ").slice(0, 8).join(" ") + "..."}</p>
                                                {/* <p>{newe.title.slice(0, 30) + "..."}</p> */}
                                                <small id='eventBoxTime'>{formattedDate(newe.createdAt)}</small>
                                            </div>}
                                        </div>
                                    })}
                                </div>
                            </div>}

                        {magazines.length !== 0 &&
                            <div className="magazineBox homeBox">
                                <h3>Magazine</h3>
                                <hr />
                                <div className="magazineInnerContent">
                                    {magazines.map((newe) => {

                                        return <div onClick={() => handleMagazine(newe.body)} key={newe._id}>
                                            {newe.tag === "MAGAZINE" && <div className="magazineInnerBox">
                                                <img src={newe.coverImageURL} alt="" />
                                                <p>{newe.title.split(" ").slice(0, 8).join(" ") + "..."}</p>
                                                <small id='magazineBoxTime'>{formattedDate(newe.createdAt)}</small>
                                            </div>}
                                        </div>
                                    })}
                                </div>
                            </div>}
                    </div>
                    {/*Right side Add container */}
                </div>
            </div >
        </>
    )
}

export default Home
