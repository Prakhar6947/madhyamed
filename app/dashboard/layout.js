"use client";
import Nologin from '@/components/nologin';
import { useSession, signIn, signOut } from "next-auth/react"
import Patients from '@/main_components/patients'


export default function Layout({ children }) {
    const {data : session} = useSession()
  return (
    <>
        {session ? (<Patients>{children}</Patients>) : (<Nologin/>)}
    </>
  );
}