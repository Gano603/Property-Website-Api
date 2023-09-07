import express, { urlencoded } from 'express'
import {config} from 'dotenv'
import { userrouter } from './routes/Userroutes.js';
import { adrouter } from './routes/Adroutes.js';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors'

export const app = express();

config({
    path:"./database/config.env"
})


/////////////////////for Development Only//////////////////
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with the origin you want to allow
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to support cookies or authentication
  };
  
  
app.use(cors(corsOptions));
////////////////////////////////////////////////////////////
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));
app.use(compression({threshold:100*1000,level:6}));
app.use(cookieParser());
app.use("/user",userrouter);
app.use("/ad",adrouter);