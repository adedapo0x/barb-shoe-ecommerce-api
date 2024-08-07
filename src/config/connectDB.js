const mongoose = require("mongoose")

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully")
    } catch (e){
        console.log("Error encountered:", e)
    }
}

module.exports = connectDB