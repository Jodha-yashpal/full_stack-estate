import express from 'express';
// import postRoute from './routes/post.route.js';

const app = express();

// app.use("/api/post", postRoute);


app.listen(3000, () => {
    console.log("server is running");
})