'use client'
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"

import { Button, Input } from "@nextui-org/react"
import {useTheme} from "next-themes";
import toast, { Toaster } from "react-hot-toast"


export default function SignupPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

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
      const response = await axios.post("/api/users/signup", user)
      toast.success("Signup Success")
      router.push('/login')
    }
    catch (error: any){
      // implement toast error here
      toast.error(`Signup failed: ${error.response.data.error}`)
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
    <div  className="flex flex-col items-center justify-center min-h-screen m-auto bg-default-50">
      <Toaster />
      

      <div className={` bg-danger-300 flex flex-col items-center justify-center max-h-screen p-6 rounded-lg border border-zinc-700`}>
        <h1 className="">{!loading ? "Signup" : "Processing"}</h1>
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
        type='username' 
        label="Username" 
        placeholder="Enter Your Username"
        value={user.username}
        className="m-2"
        onChange={(event) => setUser({...user, username: event.target.value})}
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
        onClick={onSignup}
        className="my-3"
      >SignUp</Button>

      </div>
      
      <Link href='/login'>Visit Login Page</Link>
    </div>
  )
}