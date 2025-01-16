const { mongoose } = require("mongoose");

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"User"       
    }
});

const User = mongoose.models?.User || mongoose.model("User",UserSchema);

module.exports = User;