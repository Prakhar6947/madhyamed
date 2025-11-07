"use server";
import { NextResponse } from "next/server";
import mongoConnect from "@/lib/mongo";
import { doctor_server } from "@/models/doctor";

export async function POST(req) {

    const res = await req.json()
    console.log(res)
    await mongoConnect()
    const arr = await doctor_server.find(res.js1, res.js2)
    return NextResponse.json({ data: arr })

}