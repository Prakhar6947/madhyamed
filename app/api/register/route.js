import { NextResponse } from "next/server";
import mongoConnect from "@/lib/mongo";
import { doctor_server } from "@/models/doctor";

export async function POST(req) {
    try{let data = await req.json()
    await mongoConnect()
    let user = await doctor_server.findOne({ contact: data.contact })
    if (user) {
        return NextResponse.json({ status: "User Exists" })
    } else {
        await doctor_server.create({
            name: data.name,
            contact: data.contact,
            qualifications: data.qualifications,
            specialization: data.specialization,
            experience: data.experience,
            hospital: data.hospital,
            location: data.location,
            availability: data.availability,
            password: data.password,
            type : data.type,
            image : data.image
        })
        return NextResponse.json({status: "Success"})
    }}catch(err){
        return NextResponse.json({status : "Server Error"})
    }
}