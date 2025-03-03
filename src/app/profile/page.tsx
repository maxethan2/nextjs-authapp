'use client'
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation" 


export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState<DecodedToken>({
    id: "",
    username: '',
    email: '',
    iat: 0,
    exp: 0
  })

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/users/me')
      setData(response.data.data)
    }
    getData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2 bg-default-50">
      <h1>{`Profile ${data.username}`}</h1>

    </div>
  )
}