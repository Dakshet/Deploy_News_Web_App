require('dotenv').config()

const express = require("express");
const { handleToDB } = require("./connection");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
// console.log(FRONTEND_URL);
// const FRONTEND_URL = "https://deploy-news-web-frontend.vercel.app";


// Import
const cors = require("cors");
const path = require("path")
const userRoute = require("./routes/user")
const newsRoute = require('./routes/news')
const commentRoute = require("./routes/comment")


// MongoDB connection
handleToDB(MONGODB_URL).then(() => {
    console.log("DB Connected!")
})

// Cors
app.use(cors({
    origin: FRONTEND_URL,
    methods: ["*"],
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Global handling for preflight OPTIONS requests
// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', FRONTEND_URL);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.sendStatus(204); // Respond with no content
// });




// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static(path.resolve("./uploads")));



// Routes
app.use("/user", userRoute);

app.use("/news", newsRoute);

app.use('/comment', commentRoute)

// Logging for requests (optional)
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next();
// });
////////


// Listen
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
