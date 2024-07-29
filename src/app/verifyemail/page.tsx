"use client"

import axios from "axios"
import Link from "next/link"
import React, { Suspense, useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const [token, setToken] = useState("nothing")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post('/api/users/verifyemail', {token})
      setVerified(true)
    }
    catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    var urlToken = window.location.search.split('=')[1]
    if (urlToken === undefined) {
      urlToken = ''
    }
    setToken(urlToken)
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="flex flex-col ite justify-center min-h-screen py-2">
      <h1 className="text-4xl mx-auto">Verify Email</h1>
      <h2 className="mx-auto">{token ? `${token}` : "no token"}</h2>

    <Suspense fallback={<p>Loading...</p>}>
      {verified && (
        <div className="mx-auto my-4 flex flex-col">
          <h2 className="text-2xl">Email Verified</h2>
          <Link href='/login' className="mx-auto">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div className="mx-auto my-4 flex flex-col">
          <h2 className="text-2xl">Error</h2>
        </div>
      )}
    </Suspense>
      
    </div>
  )
}