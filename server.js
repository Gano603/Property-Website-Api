import { connectDB } from './database/Database.js';
import { app } from './middlewares.js'
import ServerlessHttp from 'serverless-http';

connectDB();

app.listen(process.env.PORT,()=>{
    console.log("Working")
})