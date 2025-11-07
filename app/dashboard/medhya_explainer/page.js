"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';

function M_Ex() {
    const {data : session} = useSession()
    function send() {
    }
    if(session.user.type == 'Patient'){
        return (
            <div className='ex_ai'>
                <div className="logo"><Image src='/m_ex.png' alt='' width={100} height={100} /></div>
                <div className="welcome">Hi, {session.user.name}</div>
                <p>How can I help you?</p>
                <div className='input'>
                    <input name='prompt' type='text' placeholder='Enter Something' />
                    <Image className='sendimg' src={'/paper.png'} alt='' height={40} width={40} onClick={send} />
                </div>
            </div>
        )
    }else{
        return(
            <h1>You are not Patient</h1>
        )
    }
}

export default M_Ex
