import { connectDB } from './database/Database.js';
import { app } from './middlewares.js'

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})