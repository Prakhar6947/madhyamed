"use client";
import { SessionProvider } from "next-auth/react"
import "./login.css"

export default function Layout({children }) {

 return (
   <>
       <SessionProvider>
         {children}
       </SessionProvider>
   </>
 );
}
