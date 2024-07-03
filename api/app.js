import express from 'express';
import cors from 'cors'
import authRoute from './routes/auth.route.js';
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
app.use(cookieParser())

app.use("/api/auth", authRoute);


app.listen(3000, () => {
    console.log("server is running");
})