"use client";
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { useState, useEffect } from 'react';


const Login = () => {
  const { data: session } = useSession()
  const [state, s_state] = useState('Option')

  function Patient_Login() {
    const { data: session } = useSession()
    const [pass_change, s_p_c] = useState(false)
    const [pass, s_pass] = useState("")
    const [comp, s_comp] = useState(null)
    const [comp_f, s_comp_f] = useState(false)
    const [form, s_form] = useState({ email: '', password: '' })

    useEffect(() => {
      if (comp) {
        setTimeout(() => {
          signOut()
        }, 2000);
      }
    }, [comp])

    useEffect(() => {
      if (comp_f == true) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    }, [comp_f])

    async function handleLogin(e) {
      e.preventDefault();
      const res = await signIn("patient-login", {
        redirect: false,
        email: form.email,
        password: form.password
      })
      if (res.error) {
        console.log(res.error)
        s_comp_f(res.error)
        console.log(comp_f)
      } else {
        s_comp_f(true)
      }
      s_form({ email: '', password: '' })
    }
    if (session) {
      async function p_c() {
        if (pass !== '') {
          let response = await fetch("/login/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.email, password: `${pass}`, type: session.user.type })
          })
          let data = await response.json()
          s_comp(data.status)

        }
        s_pass("")
      }
      return (
        <div className='profile'>
          <Image className='Image' style={{ borderRadius: '50%' }} src={session.user.image} width={150} height={150} alt='Profile Picture' />
          <div id='username'>{session.user.name}</div>
          <div id='useremail'>{session.user.email}</div>

          <div id='password' onClick={() => s_p_c(true)}>
            {session.user.password == null ? 'Set-Up Password' : "Change Password"}
          </div>

          {pass_change == true ? (<><div id='change_pass'><input type='text' name='pass' value={pass} placeholder='Change Password' onChange={(e) => s_pass(e.target.value)} /><span onClick={p_c}>Submit</span> </div></>) : <></>}

          {comp == true ? (<div id='status_true'>Password Updated Successfully!!</div>) : comp == false ? (<div id='status_false'>Something is wrong !!</div>) : (<></>)}

          <button id='sign-out' onClick={() => signOut()}>Sign Out</button>

        </div>
      )
    } else {
      return (
        <div className='login'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>

            <input className='text' name='email' type='email' value={form.email} placeholder='EMAIL' onChange={(e) => s_form({ ...form, email: e.target.value })} required />
            <input className='text' name='password' type='password' value={form.password} onChange={(e) => s_form({ ...form, password: e.target.value })} placeholder='PASSWORD' />
            <input className="submit" type='submit' required />


          </form>
          {comp_f == true ? (<div id='status_true'>Login Successfully!!</div>) : comp_f == false ? (<></>) : (<div id='status_false'>{comp_f} !!</div>)}
          <h3>Or</h3>
          <button id='sign-in-google' onClick={() => signIn('google')}><Image src={"/google.png"} width={30} height={30} alt='google' /> <span>Sign with Google</span></button>
          <span onClick={() => { console.log(state); s_state('Option'); }} id='back-to-option'>Back to Options...</span>
        </div>
      )
    }
  }
  function Doctor_Login() {
    const [form, s_form] = useState({ name: '', qualifications: '', specialization: '', experience: '', hospital: '', location: '', availability: '', contact: '', password: '', type: 'doctor', image: '/profile.png' })
    const [log, s_log] = useState('')
    const [log_status, s_log_status] = useState(true)
    const [comp_f, s_comp_f] = useState(false)
    const [comp, s_comp] = useState(null)
    const [pass_change, s_p_c] = useState(false)
    const [pass, s_pass] = useState("")

    useEffect(() => {
      if (comp) {
        setTimeout(() => {
          signOut()
        }, 2000);
      }
    }, [comp])
    useEffect(() => {
      setTimeout(() => {
        if (log == 'sign-up') {
          window.location.href = '/dashboard';
        } else if (log == 'login') {
          s_log_status(false)
        }
      }, 1000);
    }, [log])

    useEffect(() => {
      if (comp_f == true) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    }, [comp_f])

    async function handle_doctor_sigin(e) {
      e.preventDefault();

      let res = await fetch('/api/register/', {
        method: 'POST', headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          qualifications: form.qualifications,
          specialization: form.specialization,
          experience: form.experience,
          hospital: form.hospital,
          location: form.location,
          availability: form.availability,
          password: form.password,
          type: form.type,
          image: form.image
        })
      })
      let data = await res.json()
      if (data.status == 'Success') {
        let res = await signIn('doctor-login', { contact: form.contact, password: form.password })
        res.error ? s_log('error') : s_log('sign-up')

      } else if (data.status == 'User Exists') {
        s_log('login')
      } else if (data.status == 'Server Error') {
        s_log('error')
      }

    }

    async function handle_doctor_login(e) {
      e.preventDefault();
      let res = await signIn('doctor-login', { redirect: false, contact: form.contact, password: form.password })
      if (res.error) {
        s_comp_f(res.error)
      } else {
        s_comp_f(true)
      }

    }

    if (session) {
      async function p_c() {
        if (pass !== '') {
          let response = await fetch("/login/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.contact, password: `${pass}`, type: session.user.type })
          })
          let data = await response.json()
          s_comp(data.status)

        }
        s_pass("")
      }
      return (
        <div className='doctor-login-profile'>
          <table>
            <caption>
              Your Profile
            </caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{session.user.name}</td>
              </tr>
              <tr>
                <td>Qualifications</td>
                <td>{session.user.qualifications}</td>
              </tr>
              <tr>
                <td>Specialization</td>
                <td>{session.user.specialization}</td>
              </tr>
              <tr>
                <td>Experience</td>
                <td>{session.user.experience} years</td>
              </tr>
              <tr>
                <td>Hospital</td>
                <td>{session.user.hospital}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{session.user.location}</td>
              </tr>
              <tr>
                <td>Availability</td>
                <td>{session.user.availability}</td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>{session.user.contact}</td>
              </tr>
            </tbody>
          </table>
          <div id='password' onClick={() => s_p_c(true)}>
            {session.user.password == null ? 'Set-Up Password' : "Change Password"}
          </div>
          {pass_change == true ? (<><div id='change_pass'><input type='text' name='pass' value={pass} placeholder='Change Password' onChange={(e) => s_pass(e.target.value)} /><span onClick={p_c}>Submit</span> </div></>) : <></>}
          {comp == true ? (<div id='status_true'>Password Updated Successfully!!</div>) : comp == false ? (<div id='status_false'>Something is wrong !!</div>) : (<></>)}
          <button id='sign-out' onClick={() => signOut()}>Sign Out</button>
        </div>
      )
    } else {
      return (
        <>
          {log_status ? (<div className='doctor-sign'>
            <form onSubmit={handle_doctor_sigin}>
              <label>Create new account</label>
              <input type="text" name="name" id="name" value={form.name} placeholder='Enter Name' onChange={(e) => s_form({ ...form, name: e.target.value })} required />
              <input type="text" name="quali" id="quali" value={form.qualifications} placeholder='Enter Qualifications' onChange={(e) => s_form({ ...form, qualifications: e.target.value })} required />
              <input type="text" name="spec" id="spec" value={form.specialization} placeholder='Enter Specialization' onChange={(e) => s_form({ ...form, specialization: e.target.value })} required />
              <input type="number" name="exp" id="exp" value={form.experience} placeholder='Enter Experience' onChange={(e) => s_form({ ...form, experience: e.target.value })} required />
              <input type="text" name="hosp" id="hosp" value={form.hospital} placeholder='Enter Hospital' onChange={(e) => s_form({ ...form, hospital: e.target.value })} required />
              <input type="text" name="loc" id="loc" value={form.location} placeholder='Enter Location' onChange={(e) => s_form({ ...form, location: e.target.value })} required />
              <input type="text" name="avail" id="avail" value={form.availability} placeholder='Enter Availability' onChange={(e) => s_form({ ...form, availability: e.target.value })} required />
              <input type="email" name="contact" id="contact" value={form.contact} placeholder='Enter Contact Email' onChange={(e) => s_form({ ...form, contact: e.target.value })} required />
              <input type="password" name="pass" id="pass" value={form.password} placeholder='Set-Up Password' onChange={(e) => s_form({ ...form, password: e.target.value })} required />
              <input id="doctor_submit" type="submit" value="Sign-Up" />

              {log == 'sign-up' ? (<div id='doctor-sigup-status-true'>Your account has been created Successfully !!</div>) : log == 'login' ? (<div id='doctor-sigup-status-false'>User Already existed!!</div>) : log == 'error' ? (<div id='doctor-sigup-status-error'>Something is Wrong!!</div>) : (<></>)}


              <span id='login-sigin-switch' onClick={() => s_log_status(false)}>Go to Login...</span>
              <span onClick={() => s_state('Option')} id='back-to-option'>Back to Options...</span>
            </form>
          </div>) : (<div className='doctor-login'>
            <form onSubmit={handle_doctor_login}>
              <label>Login</label>
              <input type='email' name='text' placeholder='EMAIL' value={form.contact} onChange={(e) => s_form({ ...form, contact: e.target.value })} required />
              <input type='password' name='text' placeholder='PASSWORD' value={form.password} onChange={(e) => s_form({ ...form, password: e.target.value })} required />
              <input className='submit' type='submit' value='Login' />
              {comp_f == true ? (<div id='status_true'>Login Successfully!!</div>) : comp_f == false ? (<></>) : (<div id='status_false'>{comp_f} !!</div>)}
              <span id='login-sigin-switch' onClick={() => s_log_status(true)}>Go to Sigin...</span>
              <span onClick={() => s_state('Option')} id='back-to-option'>Back to Options...</span>
            </form>
          </div>)}
        </>
      )
    }
  }

  function Option() {

    return (
      <div className="option">
        <label>Are you a ?</label>
        <div className="container">
          <span onClick={() => { s_state('Patient') }}>Patient</span>
          <span onClick={() => { s_state('Doctor') }}>Doctor</span>
        </div>
      </div>
    )
  }

  function Execute() {
    if (session) {
      if (session?.user?.type == 'doctor') {
        return (
          <Doctor_Login />
        )
      } else if (session?.user?.type == 'Patient') {
        return (
          <>
            <Patient_Login />
          </>
        )
      } else {
        return (<>
          {console.log(session?.user?.type)}
          <Doctor_Login />
        </>)
      }
    } else {
      return (
        <>
          {state === 'Option' ? <Option /> : state == 'Patient' ? <Patient_Login /> : <Doctor_Login />}
        </>
      )
    }
  }
  return (
    <>
      <Execute />
    </>
  )
}


export default Login
