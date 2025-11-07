"use client";
import React from 'react'
import Image from 'next/image';

const Dashboard = () => {

  function Dashboard() {
    return (
      <div className='dashboard'>
        <div className="notifications">
          <label>Notification</label>
          <div className="container"></div>
        </div>
        <div className="records_dash">
          <label>Records</label>
          <div className="container"></div>
        </div>
        <div className="features">
          <label>Features</label>
          <div className="container">
            <div className="cards doctor">
              <label>Your Doctor</label>
              <p>name</p>
              <button>View Profile</button>
            </div>
            <div className="cards rec">
              <label>Records</label>
              <p>Last open</p>
              <button>View List</button>
            </div>
            <div className="cards img">
              <Image src={'/m_ex.png'} alt='explainer' width={200} height={200} />
            </div>
            <div className="cards img">
              <Image src={'/calendar.png'} alt='explainer' width={180} height={180} />
            </div>
            <div className="cards img">
              <Image src={'/typing.png'} alt='explainer' width={160} height={160} />
            </div>
            <div className="cards img">
              <Image src={'/feedback.png'} alt='explainer' width={170} height={170} />
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      <Dashboard/>
    </>
  )
}

export default Dashboard
