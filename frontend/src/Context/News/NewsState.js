import React, { useState } from 'react'
import NewsContext from './NewsContext'
import { useDispatch } from 'react-redux';
import { storeUserLogin } from '../../redux/counter/counterSlice';

const NewsState = (props) => {

    // const host = "http://localhost:5000";
    const host = process.env.REACT_APP_SECRET_KEY;
    // console.log(host);

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

        // This helps catch network errors like connection issues or invalid URL.
        // Failure in the try-catch block:
        // Network issues: If the server is unreachable, such as the API URL being incorrect (http://localhost:5001/news/fetchallnews), the fetch request will fail, triggering the catch block.
        // CORS issues: Cross-Origin Resource Sharing (CORS) errors can occur if the API server does not allow requests from your frontend. This can result in the fetch call failing and hitting the catch block.
        // Invalid URL: If the URL or endpoint is incorrect, the request will fail, and the catch block will handle it.
        // Server downtime: If the server is down or overloaded, the network request will fail, and the error will be caught in the catch block.
        try {
            const response = await fetch(`${host}/news/fetchallnews`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            // If the response status is not 2xx, it logs an error with the status code. 
            // Failure in response.ok:
            // Server returned an error: The response.ok is false when the server returns a non-2xx HTTP status code, such as:
            // 404 (Not Found): The endpoint does not exist on the server.
            // 500 (Internal Server Error): The server encountered an issue processing the request.
            // 401 (Unauthorized): The request requires authentication, and you didn't provide valid credentials.
            // Solution: Always check the response.status to understand the exact HTTP error.
            if (response.ok) {
                const json = await response.json();


                // Failure in json.news:
                // Invalid JSON format: If the response body is not valid JSON or if there’s a syntax error, the .json() call will fail. In this case, the catch block might catch the error when trying to parse the JSON.
                // Missing news property: The response may not include the news field as expected, or the API might be returning an unexpected structure (e.g., due to changes in the backend).
                // Solution: You should always check if json.news exists before accessing it, which you're already doing.
                // Empty or incorrect response: The API could return a response, but it may be an empty object or have an unexpected format. This can happen if there is a backend issue or if the request parameters are incorrect.
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
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            setNews([]); // Optional: Reset state in case of network error
        }
    }


    //Fetch news for particular page
    const fetchPageSpecificNews = async (pageName) => {

        try {
            const response = await fetch(`${host}/news/fetchspecificpagenews?tag=${pageName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.allNews) {
                    setPageNews(json.allNews);
                }

                else {
                    console.log(json.Error);
                    setPageNews([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setPageNews([]);
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            setPageNews([]);
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
    const deleteNews = async (id, coverImageURL) => {

        // const newNote = pageNews.filter((news) => news._id !== id)

        // console.log(newNote);

        // setPageNews(newNote);

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

    return (<NewsContext.Provider value={{ news, fetchNews, pageNews, fetchPageSpecificNews, getNewsUsingId, specificNews, setSpecificNews, addNews, deleteNews, editNews, commentNews, fetchComment, addComment, searchNewsResult, setSearchNewsResult, fetchSearchNews, loginUserInfo, addMagazine, deleteMagazine }}>
        {props.children}
    </NewsContext.Provider>
    )
}

export default NewsState
