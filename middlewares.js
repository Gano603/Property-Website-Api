import express, { urlencoded } from 'express'
import {config} from 'dotenv'
import { userrouter } from './routes/Userroutes.js';
import { adrouter } from './routes/Adroutes.js';
import cookieParser from 'cookie-parser';
import compression from 'compression';

export const app = express();

config({
    path:"./database/config.env"
})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));
app.use(compression({threshold:100*1000,level:6}));
app.use(cookieParser());
app.use("/user",userrouter);
app.use("/ad",adrouter);