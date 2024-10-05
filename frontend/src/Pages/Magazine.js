import React, { useContext, useEffect } from 'react'
import "./Magazine.css"
import NewsContext from '../Context/News/NewsContext';
import MagazineItem from '../Components/MagazineItem';

const Magazine = ({ showProfile, showAddMenu, showAlert }) => {
    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);


    useEffect(() => {
        fetchPageSpecificNews("MAGAZINE");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Magazine";  // Set the document title to the news title
    }, []);


    if (!pageNews || pageNews.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <div className={`magazine ${showProfile ? "userMenu" : ""} ${showAddMenu ? "showMenu" : ""}`}>
            <div className="magazineContainer">
                <h3>Magazine</h3>
                <hr />
                <div className="magazineContainerInner">
                    {pageNews.map((mNews) => {
                        return <MagazineItem key={mNews._id} mNews={mNews} showAlert={showAlert} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Magazine
