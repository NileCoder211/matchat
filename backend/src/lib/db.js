import mongoose from "mongoose";
import {ENV} from "./env.js"

export const connectionDB = async ()=>{
    try {
        const connecttion = await mongoose.connect(ENV.MONGO_URI);
        console.log("DB connected successfully");
        
    } catch (error) {
        console.error("Error in DB connection:", error);
        process.exit(1); //1 status means fail, 0 means success

        
    }
}