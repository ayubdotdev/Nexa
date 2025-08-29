import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    clerkId: {
        type:String,
        required:true,
        unique:true,
    }
},{timestamps: true})//createdaAt etc. 

export const User = mongoose.model("User",userSchema)