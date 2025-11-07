import React from 'react'
import "./nologin.css"
import Link from 'next/link'

const Nologin = () => {
  return (
    <div className='nologin'>
      <h1>Please Login to access it !</h1>
      <Link href={'/login'}><button>Go to the Login page</button></Link>
    </div>
  )
}

export default Nologin
