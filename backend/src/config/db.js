// import express from 'express';
import mongoose from "mongoose"

 
export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected')
        
    }
    catch(error){
      console.error("error connecting to mongodb",error)
      process.exit(1)//Exit with failure
    }
}