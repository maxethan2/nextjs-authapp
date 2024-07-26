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
    username: ''
  })

  const onSignup = async () => {

  }


  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Signup page</h1>
      <hr />
      <label htmlFor='username'>Username</label>
      <input 
        className="p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:border-blue-600"
        id='username'
        type='text'
        value={user.username}
        onChange={(event) => setUser({...user, username: event.target.value})}
        placeholder="Username"
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

      <label htmlFor='email'>email</label>
      <input 
        className="p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:border-blue-600"
        id='email'
        type='text'
        value={user.email}
        onChange={(event) => setUser({...user, email: event.target.value})}
        placeholder="email"
      />

      <button 
          className="p-2 border border-gray-300 roundef-lg mb-4 bg-blue rounded-md m-2"
          onClick={onSignup}
      >Signup here</button>

      <Link href='/login'>Visit Login Page</Link>
    </div>
  )
}