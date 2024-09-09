import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL, 
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(3000, () => {
    console.log("server is running");
})