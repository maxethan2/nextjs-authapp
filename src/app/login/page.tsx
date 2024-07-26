'use client'
import Link from "next/link"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" 
import {axios} from "axios"


export default function SignupPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const onLogin = async () => {

  }


  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Login</h1>
      <hr />

      <label htmlFor='email'>email</label>
      <input 
        className="p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:border-blue-600"
        id='email'
        type='text'
        value={user.email}
        onChange={(event) => setUser({...user, email: event.target.value})}
        placeholder="email"
      />

      <label htmlFor='password'>Password</label>
      <input 
        className="p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:border-blue-600"
        id='password'
        type='password'
        value={user.password}
        onChange={(event) => setUser({...user, password: event.target.value})}
        placeholder="Password"
      />

      <button 
          className="p-2 border border-gray-300 roundef-lg mb-4 bg-blue rounded-md m-2"
          onClick={onLogin}
      >Login here</button>

      <Link href='/signup'>Visit Signup Page</Link>
    </div>
  )
}