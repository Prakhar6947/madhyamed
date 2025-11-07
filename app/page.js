"use client";
import Image from "next/image";
import { useState, useEffect } from "react";



export default function Home() {

  const [width , s_width] = useState(0)
  useEffect(() => {
    s_width(window.innerWidth)
  },[])

  return (
    <div className="home">
      <button onClick={() =>{runCommand()}}>Bash</button>
      <div className="top">
        <div className="back"></div>
        <div className="welcome">Welcome Everyone</div>
        <div className="title">Medhyamed</div>
        <div className="desc">WHERE REPORTS SPEAKS CLEARLY!</div>
        <button className="start">LETS START</button>
        <Image className='img' style={{objectFit: 'cover'}} src='/img1.jpg' alt="" width={width/2} height={500} />
      </div>

      <div className="middle">
        <div className="card_container">
          <div>
            <div>
              <Image src='/explainer-home' alt="" width={100} height={80} />
            </div>
            <div>
              <label style={{color:'blue'}}>Medhya Explainer</label>
              <p>Get instant simplified version of your medical report through AI</p>
              <Image className="img" src='/arrow-blue.png' alt="arrow" width={30} height={30} />
            </div>
          </div>
          <div>
            <div>
              <Image src='/scribe-home' alt="" width={80} height={80} />
            </div>
            <div>
              <label style={{color:'purple'}}>Medhya Scribe</label>
              <p>Generate instant report through AI for Doctors</p>
              <Image src='/arrow-pink.png' alt="arrow" width={30} height={30} />
            </div>
          </div>
        </div>
        <div className="para">
          <label>Clarity in every Scan</label>
          <p>AI-powered radiology reports, patient-friendly explanations to ensure transparency, and seamless doctor–patient communication that you never experience before.</p>
        </div>
        {/* <div className="doctorback" style={{backgroundColor:'black'}}>
          <Image className='img' src='/doctor-back.jpg' alt="" width={width} height={600} style={{ objectFit: "cover",backgroundColor:'black', opacity:'0.15' }}/>
          <div>
          <div className="meet">Meet</div>
          <div className="your">Your</div>
          <div className="doctor">Doctor</div>
          <div className="now">Now</div>
          </div>
        </div> */}
      </div>

    </div>

  );
}
