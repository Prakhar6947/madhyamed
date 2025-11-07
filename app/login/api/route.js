"use server";
import { NextResponse } from "next/server";
import mongoConnect from "@/lib/mongo";
import { user_server } from "@/models/user";
import Email from "next-auth/providers/email";
import { doctor_server } from "@/models/doctor";

export async function POST(req) {
    await mongoConnect()
    let status
    try{
        const profile = await req.json()
        let user
        if(profile.type == 'doctor'){
            user = await doctor_server.findOne({contact : profile.email})
        }else if(profile.type == 'Patient'){
            user = await user_server.findOne({email : profile.email})
        }
        user.password = profile.password
        await user.save()
        status = true

    }catch(err){
        console.log(err)
        status = false
    }
    return NextResponse.json({status : status})
} 