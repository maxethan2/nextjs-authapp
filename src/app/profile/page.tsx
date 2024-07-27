'use client'
import axios from "axios"
import React, { useState } from "react"
import Link from "next/link"

export default function ProfilePage() {
  const [data, setData] = useState('')

  const getUserDetails = async () => {
    const response = await axios.get('/api/users/me')
    setData(response.data.data._id)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <h2>{data === '' ? 'Nothing' : <Link href={`/profile/${data}`}>FART</Link>}</h2>

      <button className="bg-blue-500" onClick={getUserDetails}>bruh what the buh this is trash</button>
    </div>
  )
}