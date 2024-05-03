const mongoose = require("mongoose");

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://Sandeep:Sandeep@123@cluster0.zyillcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MangoBD Connected');
    }
    catch (error){
        console.log(error)
    }
}

module.exports = connectDb;