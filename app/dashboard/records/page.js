"use client";
import React from 'react'
import { useState } from 'react';
import "./record.css";
import Image from 'next/image';

function Records() {
    let json = [{ title: 'Report 1', date: '8 Oct 2025' }, { title: 'Report 2', date: '1 Nov 2025' },{ title: 'Report 3', date: '18 Nov 2025' }, { title: 'Report 4', date: '1 Dec 2025' }]
    const [records, s_records] = useState(json)
    return (
        <>
            <div className="records">
                <label>Records</label>
                <ol className="record_area">
                    {records.reverse().map((x, i) => {
                        return (<li key={i}>
                            <span className="title">{i + 1}{')'} {x.title}</span>
                            <span className="date"> {x.date}</span>
                            <span className="img">
                                <Image src={'/calendar.png'} alt='' width={30} height={30} />
                                <Image src={'/phone.png'} alt='' width={30} height={30} />
                                <Image src={'/video.png'} alt='' width={30} height={30} />
                                <Image src={'/typing.png'} alt='' width={30} height={30} />
                                <Image src={'/medical.png'} alt='' width={30} height={30} />
                            </span>
                        </li>)
                    })}
                </ol>
            </div>
        </>
    )
}

export default Records
