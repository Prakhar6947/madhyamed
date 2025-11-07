"use client";
import React, { useState , useEffect} from 'react'
import Link from 'next/link'
import './navbar.css'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useMediaQuery from "@/lib/mediaqueries";



const Navbar = () => {


  const { data: session } = useSession()
  let login, dashboard, dash_link
  if (session) {
    login = (<Image className='Login-pic' src={session.user.image} alt='profile' width={50} height={50} />)
    dashboard = "Dashboard"
    dash_link = "/dashboard"
  } else {
    login = "Login"
    dashboard = "Services"
    dash_link = "/services"
  }


  function open_nav() {
    document.getElementsByTagName('nav')[0].style.transform = 'translateX(0vw)'
    document.getElementsByClassName('nav-more')[0].style.transform = 'translateX(-20vw)'
  }

  const ismobile = useMediaQuery("(max-width: 700px)")
  if (ismobile == undefined) return null

  function close_nav() {
    if (ismobile) {
      document.getElementsByClassName('nav-more')[0].style.transform = 'translateX(0vw)'
      document.getElementsByTagName('nav')[0].style.transform = 'translateX(-40vw)'
    }
  }

  return (
    <>
      <div className='nav-more' >
        <Image className='img' onClick={open_nav} src={'/more.png'} alt='more' height={35} width={35} /> 
        <Image className='img' onClick={open_nav} src={'/more.png'} alt='more' height={35} width={35} /> 
      </div>
      <nav>
        <ul>
          <li className='close' onClick={close_nav}>Close</li>
          <li><Link className='Nav-components' key={0} onClick={close_nav} href={'/'}>Home</Link></li>
          <li><Link className='Nav-components' key={1} onClick={close_nav} href={dash_link}>{dashboard}</Link></li>
          <li><Link className='Nav-components' key={2} onClick={close_nav} href={'/about'}>About us</Link></li>
          <li><Link className='Nav-components' key={3} onClick={close_nav} href={'/login'}>{login}</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
