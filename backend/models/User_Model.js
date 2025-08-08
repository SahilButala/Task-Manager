import mongoose  from "mongoose";



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
     email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    profileImageUrl : {
        type : String,
    },
    role : {
        type : String,
        enum : ["admin" , "member"],
        default : "member"
    },
},{
    timestamps : true
})

const UserModel = mongoose.model.User  || mongoose.model("User" , userSchema)

export default UserModel