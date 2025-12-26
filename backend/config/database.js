import mongoose from "mongoose";

export const dbConnection=async()=>{
    try {
      const connect=  await mongoose.connect(process.env.MONGO_URL)
      if(connect){
        console.log("Database connected successfully");
      }else{
        console.log("Database connection failed");
      }
        
    } catch (error) {
        console.log("Database connection failed",error);
        
    }
}