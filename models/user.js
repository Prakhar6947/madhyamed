import mongoose from "mongoose";

const user_Schema = new mongoose.Schema({
    email: String,
    name: String,
    image: String,
    type : String,
    password: String
})

export const user_server = mongoose.models.user || mongoose.model("user" , user_Schema , "users")
