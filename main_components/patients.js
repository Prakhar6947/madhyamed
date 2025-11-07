'use client';
import React from 'react'
import './patients.css'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Patients = ({ children }) => {
    const { data: session } = useSession()


    return (
        <>
            <div className='Patient_container'>
                <div className="side_bar">
                    <ul>
                        <Link className='link_nav' href={'/dashboard'}><li>Dashboard</li></Link>
                        <Link className='link_nav' href={'/dashboard/records'}><li>Records</li></Link>


                        {session.user.type == 'Patient' ? (<><Link className='link_nav' href={'/dashboard/medhya_explainer'}><li>Medhya Explainer</li></Link>
                            <Link className='link_nav' href={'/dashboard/doctor'}><li>Doctor</li></Link> </>) : (<Link className='link_nav' href={'/dashboard/medhya_scriber'}><li>Medhya Scribe</li></Link>)}


                        <Link className='link_nav' href={'/dashboard/book_appointment'}><li>Book Appointment</li></Link>
                        <Link className='link_nav' href={'/dashboard/inbox'}><li>InBox</li></Link>
                        <Link className='link_nav' href={'/dashboard/feedback'}><li>Feedback</li></Link>
                    </ul>
                </div>
                <div className="main_part">
                    {children}
                </div>
            </div>
        </>
    )
}


export default Patients
