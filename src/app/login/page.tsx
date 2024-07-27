'use client'
import Link from "next/link"
import React, { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"

import { Button, Input } from "@nextui-org/react"
import { useTheme } from "next-themes"
import toast, { Toaster } from "react-hot-toast"


export default function LoginPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

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
      toast.success(`${response.data.message}`)
      router.push(`/profile`)
    }
    catch (error: any) {
      // implement toast error
      toast.error(`Login Failed: ${error.response.data.message}`)  
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2 m-auto">

      <Toaster />

      <div className={`bg-danger-300 flex flex-col items-center justify-center max-h-screen p-6 rounded-lg border border-zinc-700`}>

        <h1 className="">Login</h1>
        <hr />

        <Input 
          type='email' 
          label="Email" 
          placeholder="Enter Your Email"
          value={user.email}
          className="m-2"
          onChange={(event) => setUser({...user, email: event.target.value})}
        />

        <Input 
          type='password' 
          label="Password" 
          placeholder="Enter Your Password"
          value={user.password}
          className="m-2"
          onChange={(event) => setUser({...user, password: event.target.value})}
        />

        <Button 
          color='default' 
          isDisabled={buttonDisabled}
          variant="shadow"
          isLoading={loading}
          onClick={onLogin}
          className="my-3"
        >Login</Button>

      </div>

      <Link href='/signup'>Visit Signup Page</Link>
    </div>
  )
}