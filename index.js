import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cookieParser, { signedCookie } from 'cookie-parser';
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './routes/user.route.js';

let app= express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser("secretkey"));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

connectDB();

app.get("/",(req,res)=>{
    res.send("welcome to my server");
});

app.use("/api/user",userRouter);

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`server is running at port ${port} `);
})
