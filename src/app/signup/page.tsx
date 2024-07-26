'use client'
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"


export default function SignupPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = axios.post("/api/users/signup", user)
      console.log("Signup success", response)
      router.push('/login')
    }
    catch (error: any){
      // implement toast error here
      console.log('Signup Failed', error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">{!loading ? "Signup" : "Processing"}</h1>
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
      >{buttonDisabled ? "No signup" : "Signup Here"}</button>

      <Link href='/login'>Visit Login Page</Link>
    </div>
  )
}