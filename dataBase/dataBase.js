import mongoose from "mongoose";

 export const dataBase=()=>{
    mongoose.connect(process.env.DATA_BASE_URL).then((res)=>{
        console.log(`Data Base Connected with ${res.connection.host}`)
    }).catch((err)=>{
        console.log(`error ${err}`)
    })
}