'use client'
import Link from "next/link"
import React, { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"


export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log(response.data)
      router.push(`/profile`)
    }
    catch (error: any) {
      // implement toast error
      console.log("Login failed" ,error.message)  
    }
    finally {
      setLoading(false)
    }
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