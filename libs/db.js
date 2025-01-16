const mongoose = require('mongoose');

const connectDB = async() =>{
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if(connection)
    {
        console.log("connection establish successfully");
    }
    else{
        console.log("connection failed");
    }
}

module.exports = connectDB;