import mongoose from "mongoose";
import ApiError from "../utils/error.js";
const connectDB=async()=>{
try {
 const conn= await mongoose.connect(process.env.MONGO_URI) 
  console.log(`database is connected: ${conn.connection.host}`) 
} catch (error) {
 throw ApiError.ServerError(`database is not connected ${error.message}`)
}
}

export default connectDB