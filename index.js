import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cookieParser, { signedCookie } from 'cookie-parser';
import helmet from 'helmet';

let app= express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}
));
app.use(express.json());
app.use(morgan());
app.use(cookieParser({
    signedCookie:true,
}));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.get("/",(req,res)=>{
    res.send("welcome to my server");
})
const port = 8080 || process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port} `);
})
