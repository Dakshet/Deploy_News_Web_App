import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './AdSection.css';
import ad10 from '../Images/ad10.jpg';
import ad12 from '../Images/ad12.jpg';
import ad13 from '../Images/ad13.jpg';
import ad4 from '../Images/ad4.jpg';
import ad5 from '../Images/ad5.jpg';
import ad8 from '../Images/ad8.jpg';
import ad11 from '../Images/ad11.jpg';
import backIcon from '../Images/back-icon.png';
import nextIcon from '../Images/next-icon.png';
import NewsContext from '../Context/News/NewsContext';

const AdSection = () => {
    const slider = useRef();
    // const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { seeAds, fetchPageSpecificNews } = useContext(NewsContext);

    const handleNextBtn = useCallback(() => {
        if (seeAds.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % seeAds.length);
    }, [seeAds])

    const handleBackBtn = useCallback(() => {
        if (seeAds.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + seeAds.length) % seeAds.length);
    }, [seeAds])

    useEffect(() => {
        fetchPageSpecificNews("AD");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Fetch seeAds from the database
    // useEffect(() => {
    //     // Simulating a database fetch
    //     const fetchSlides = async () => {
    //         // Replace this with your API call to fetch seeAds
    //         const fetchedSlides = [{
    //             ad: ad10, link: "https://www.google.com"
    //         }, {
    //             ad: ad11, link: "https://www.facebook.com"
    //         }, {
    //             ad: ad12, link: "https://www.instagram.com"
    //         }, {
    //             ad: ad13, link: "https://www.linkedin.com"
    //         }, {
    //             ad: ad5, link: "https://www.amazon.com"
    //         }, {
    //             ad: ad8, link: "https://www.ebay.com"
    //         }, {
    //             ad: ad4, link: "https://www.youtube.com"
    //         }];
    //         setSlides(fetchedSlides);
    //     };

    //     fetchSlides();
    // }, []);

    useEffect(() => {
        if (seeAds.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % seeAds.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [seeAds]);

    // console.log(currentIndex)

    return (
        <div className="adSection">
            {/* <div className="adButtons"> */}
            <img src={backIcon} alt="Back" id='backIcon' className='adBtn' onClick={handleBackBtn} />
            {/* </div> */}
            <div className="slider" ref={slider}>
                {seeAds.map((slide, index) => (
                    <div
                        className="slide"
                        key={index}
                        style={{
                            transform: `translateX(${-currentIndex * 100}%)`,
                        }}
                    >
                        <a href={slide.body} target="_blank" rel="noopener noreferrer">
                            <img src={slide.coverImageURL} alt={`Advertisement ${index + 1}`} />
                            <p className='adImageBtn'>Click For More Details</p>
                        </a>

                    </div>
                ))}
            </div>
            <img src={nextIcon} alt="Next" id='nextIcon' className='adBtn' onClick={handleNextBtn} />
        </div>
    );
};

export default AdSection;
