import mongoose from "mongoose";

const doctor_Schema = new mongoose.Schema({
    name: String,
    qualifications: String,
    specialization: String,
    experience: Number,
    hospital: String,
    location: String,
    availability: String,
    contact: String,
    password: String,
    type: String,
    image: String
})

export const doctor_server = mongoose.models.doctor || mongoose.model("doctor" , doctor_Schema , "doctors")
