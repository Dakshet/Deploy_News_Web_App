import React, { useEffect, useRef, useState } from 'react';
import './AdSection.css';
import ad10 from '../Images/ad10.jpg';
import ad12 from '../Images/ad12.jpg';
import ad13 from '../Images/ad13.jpg';
import ad4 from '../Images/ad4.jpg';
import ad5 from '../Images/ad5.jpg';
import ad8 from '../Images/ad8.jpg';
import ad11 from '../Images/ad11.jpg';

const AdSection = () => {
    const slider = useRef();
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch slides from the database
    useEffect(() => {
        // Simulating a database fetch
        const fetchSlides = async () => {
            // Replace this with your API call to fetch slides
            const fetchedSlides = [{
                ad: ad10, link: "https://www.google.com"
            }, {
                ad: ad11, link: "https://www.facebook.com"
            }, {
                ad: ad12, link: "https://www.instagram.com"
            }, {
                ad: ad13, link: "https://www.linkedin.com"
            }, {
                ad: ad5, link: "https://www.amazon.com"
            }, {
                ad: ad8, link: "https://www.ebay.com"
            }, {
                ad: ad4, link: "https://www.youtube.com"
            }];
            setSlides(fetchedSlides);
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [slides]);

    return (
        <div className="adSection">
            <div className="slider" ref={slider}>
                {slides.map((slide, index) => (
                    <div
                        className="slide"
                        key={index}
                        style={{
                            transform: `translateX(${-currentIndex * 100}%)`,
                        }}
                    >
                        <a href={slide.link} target="_blank" rel="noopener noreferrer">
                            <img src={slide.ad} alt={`Advertisement ${index + 1}`} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdSection;
