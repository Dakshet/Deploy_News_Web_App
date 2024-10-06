require('dotenv').config()

const express = require("express");
const { handleToDB } = require("./connection");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
console.log(FRONTEND_URL);


// Import
const userRoute = require("./routes/user")
const newsRoute = require('./routes/news')
const commentRoute = require("./routes/comment")
const cors = require("cors")
const path = require("path")


// MongoDB connection
handleToDB(MONGODB_URL).then(() => {
    console.log("DB Connected!")
})

// Cors
app.use(cors({
    origin: [FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}))

app.options('*', cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

// const FRONTEND_URL = process.env.FRONTEND_URL || "https://deploy-news-web-frontend.vercel.app";

// // CORS Configuration
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || FRONTEND_URL.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
// }));

// app.options('*', cors()); // Handle preflight requests for all routes


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static(path.resolve("./uploads")))


// Engine





// const allowedOrigins = ['https://deploy-news-web-frontend.vercel.app'];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
//     credentials: true, // Allow credentials if you are using cookies or authentication
// }));

// app.options('*', cors()); // Preflight request handling


// Routes
app.use("/user", userRoute);

app.use("/news", newsRoute);

app.use('/comment', commentRoute)

// app.get('/news/fetchallnews', (req, res) => {
//     res.json({ data: 'news data' });
// });



// Listen
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
