import  Express  from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import { dataBase } from "./dataBase/dataBase.js";
import cookieParser from "cookie-parser";

import UserRouter from './routers/routerUser.js';
import InvoiceRouter from './routers/routerInvoice.js';

dotenv.config({path:'./config/config.env'})


dataBase()

const app=Express();
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(cookieParser()) 
// app.use(cors())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:['GET','POST','DELETE','PUT'],
    credentials:true,
    
}))


app.use('/api/user',UserRouter)
app.use('/api/invoice',InvoiceRouter)


app.get('/',(req,res)=>{
    res.send('working')
})



app.listen(process.env.PORT,()=>{
    console.log(`server is running on port-no ${process.env.PORT}`)
})