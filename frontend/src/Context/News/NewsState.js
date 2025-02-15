import React, { useState } from 'react'
import NewsContext from './NewsContext'
import { useDispatch } from 'react-redux';
import { storeUserLogin } from '../../redux/counter/counterSlice';

const NewsState = (props) => {

    const host = process.env.REACT_APP_SECRET_KEY;

    const newsInitial = [];

    const [news, setNews] = useState(newsInitial);

    const pageInitial = [];

    const [pageNews, setPageNews] = useState(pageInitial);

    const [specificNews, setSpecificNews] = useState({})

    const dispatch = useDispatch();

    const commentInitial = [];

    const [commentNews, setCommentNews] = useState(commentInitial);

    // const commentIdx = useSelector((state) => state.counter.commentIds)   //Newsid and client id are same so that it is not used

    const searchInitial = [];

    const [searchNewsResult, setSearchNewsResult] = useState(searchInitial);

    // const [userLogin, setUserLogin] = useState({});

    const [seeAds, setSeeAds] = useState([]);




    //Fetch user using token
    const loginUserInfo = async () => {

        try {
            const response = await fetch(`${host}/user/loginuserdetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.user) {
                    dispatch(storeUserLogin(json.user));
                }

                else {
                    console.log(json.Error);
                    // dispatch(storeUserLogin());
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                // dispatch(storeUserLogin(json.user));
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            // dispatch(storeUserLogin(json.user));
        }
    }


    //Fetch news for home screen
    const fetchNews = async () => {
        try {
            const response = await fetch(`${host}/news/fetchallnews`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();
                // console.log(json);
                if (json.news) {
                    setNews(json.news);
                }

                else {
                    console.log(json.Error);
                    setNews([]);//Reset state when 'news' is missing
                }
            }
            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setNews([]);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setNews([]); // Optional: Reset state in case of network error
        }
    }


    //Fetch news for particular page
    const fetchPageSpecificNews = async (pageName) => {

        try {
            setPageNews([]);
            const response = await fetch(`${host}/news/fetchspecificpagenews?tag=${pageName}`, {
                // const response = await fetch(`https://deploy-news-web-backend.vercel.app/news/fetchspecificpagenews?tag=${pageName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.allNews) {
                    if (pageName === "AD") {
                        setSeeAds(json.allNews)
                    }
                    else {
                        setPageNews(json.allNews);
                    }
                }

                else {
                    console.log(json.Error);
                    setPageNews([]);
                    setSeeAds([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setPageNews([]);
                setSeeAds([]);
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            setPageNews([]);
            setSeeAds([]);
        }
    }


    //Fetch news using newsID
    const getNewsUsingId = async (id) => {
        // let newsIdx;
        // if (id !== undefined) {
        //     newsIdx = id;

        try {
            const response = await fetch(`${host}/news/fetchspecificnews/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    setSpecificNews(json.news)
                }

                else {
                    console.log(json.Error);
                    setSpecificNews({});
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setSpecificNews({});
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            setSpecificNews({});
        }
    }


    //Add news
    const addNews = async (title, body, tag, coverImageURL) => {

        try {

            const response = await fetch(`${host}/news/addnews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ title, body, tag, coverImageURL })
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    // console.log(json.news);
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
        }
    }



    //Add Magazine
    const addMagazine = async (title, body, coverImageURL) => {

        try {

            const response = await fetch(`${host}/news/addmagazine`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ title, body, coverImageURL })
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    window.open(`${json.news.body}`, "_blank", "noreferrer");
                    fetchPageSpecificNews("MAGAZINE");
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
        }
    }


    //Delete News
    const deleteNews = async (id, coverImageURL, tag) => {

        // const newNote = pageNews.filter((news) => news._id !== id)

        // console.log(newNote);

        // setPageNews(newNote);

        if (tag === "AD") {
            const newAdArray = seeAds.filter((ads) => ads._id !== id);

            setSeeAds(newAdArray);
        }

        try {

            const response = await fetch(`${host}/news/deletenews?id=${id}&coverImage=${coverImageURL}}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    await response.json();
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
        }
    }



    //Delete Magazine
    const deleteMagazine = async (id, coverImageURL, pdfName) => {
        console.log(pdfName)

        try {

            const response = await fetch(`${host}/news/deletemagazine?id=${id}&coverImage=${coverImageURL}&pd=${pdfName}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    // console.log(json.news);
                    const newNote = pageNews.filter((news) => news._id !== id)
                    setPageNews(newNote);
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
        }
    }


    //Update News
    const editNews = async (id, title, desc, tag, prevDescription) => {


        try {

            const response = await fetch(`${host}/news/updatenews/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ title, desc, tag, prevDescription })
            })


            if (response.ok) {
                const json = await response.json();

                if (json.news) {

                    const newNote = JSON.parse(JSON.stringify(specificNews));

                    newNote.title = title;
                    newNote.body = desc;
                    newNote.tag = tag;

                    setSpecificNews(newNote);
                }

                else {
                    console.log(json.Error);
                    setSpecificNews({});
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setSpecificNews({});
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setSpecificNews({});
        }
    }


    //Fetch Comment
    const fetchComment = async (id) => {

        try {

            const response = await fetch(`${host}/comment/fetchallcomments/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.comments) {
                    setCommentNews(json.comments);
                    // console.log(json.comments);
                }

                else {
                    console.log(json.Error);
                    setCommentNews([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setCommentNews([]);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setCommentNews([]);
        }
    }


    //Add new comment
    const addComment = async (newsIdAddComment, content) => {

        try {

            const response = await fetch(`${host}/comment/addcomment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ content, newsId: newsIdAddComment })
            })

            if (response.ok) {
                const json = await response.json();

                if (json.comment) {
                    setCommentNews(commentNews.concat(json.comment));
                }

                else {
                    console.log(json.Error);
                    setCommentNews(commentNews);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setCommentNews(commentNews);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setCommentNews(commentNews);
        }
    }


    //Fetch Serch News
    const fetchSearchNews = async (word) => {

        // console.log(json.news);

        // setSearchNewsResult(json.news);


        try {

            const response = await fetch(`${host}/news/fetchsearchuser?search=${word}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    setSearchNewsResult(json.news);
                }

                else {
                    console.log(json.Error);
                    setSearchNewsResult([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setSearchNewsResult([]);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setSearchNewsResult([]);
        }
    }



    //Count Visit
    const visitCounter = async () => {

        const date = new Date();
        let monthInNum = date.getMonth();

        try {

            const response = await fetch(`${host}/news/updatecount?month=${monthInNum}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.count) {
                    // console.log(json.count);

                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error counting news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            console.error("Error counting the news:", error);
        }


    }



    //Add Magazine
    const addAdvertisement = async (body, coverImageURL) => {

        try {

            const response = await fetch(`${host}/news/addadvertisement`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ body, coverImageURL })
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    //console.log(json.news)
                    // setSeeAds.concat(json.news);
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
        }
    }



    return (<NewsContext.Provider value={{ news, fetchNews, pageNews, setPageNews, fetchPageSpecificNews, getNewsUsingId, specificNews, setSpecificNews, addNews, deleteNews, editNews, commentNews, fetchComment, addComment, searchNewsResult, setSearchNewsResult, fetchSearchNews, loginUserInfo, addMagazine, deleteMagazine, visitCounter, addAdvertisement, seeAds }}>
        {props.children}
    </NewsContext.Provider>
    )
}

export default NewsState
