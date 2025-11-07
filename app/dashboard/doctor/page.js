"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import './doctor.css'

function Doctor() {
    const [doctors_json, s_dj] = useState([])
    const [profile, s_profile] = useState(false)
    useEffect(() => {
        extracter()
    }, [])

    async function extracter() {

        const res = await fetch('/dashboard/doctor/api', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ js1: {}, js2: {} }) })
        const data = await res.json()
        await s_dj(data.data)
    }

    return (
        <>
            {profile == false ? (<div className="doctor_container">
                <label className='doctor_title'>Doctors</label>
                <div className="doctor-profile">
                    {doctors_json.map((x, i) => {
                        return (
                            <div key={i} className="doctor_card">
                                <label>{x.name}</label>
                                <p>{x.specialization}</p>
                                <p>{x.location}</p>
                                <button onClick={() => s_profile(x)}>View Profile</button>
                            </div>
                        )
                    })}
                </div>
            </div>) : (
                <div className="doctor_personal_profile">
                    <Image onClick={() => s_profile(false)} id='back' src={"/left-arrow.png"} alt="" width={50} height={50} />
                    <table>
                        <caption>
                            <span>{profile.name}&apos;s Profile</span>
                        </caption>
                        <tbody>
                            <tr>
                                <td>Qualifications</td>
                                <td>{profile.qualifications}</td>
                            </tr>
                            <tr>
                                <td>Specialization</td>
                                <td>{profile.specialization}</td>
                            </tr>
                            <tr>
                                <td>Experience</td>
                                <td>{profile.experience} years</td>
                            </tr>
                            <tr>
                                <td>Hospital</td>
                                <td>{profile.hospital}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{profile.location}</td>
                            </tr>
                            <tr>
                                <td>Availability</td>
                                <td>{profile.availability}</td>
                            </tr>
                            <tr>
                                <td>Contact</td>
                                <td>{profile.contact}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default Doctor
