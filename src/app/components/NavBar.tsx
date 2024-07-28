'use client'

import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation"; 
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter()
  // pathname lets you read the current urls pathname (used to update useEffect everytime a path is changed)
  const pathname = usePathname()
  const [data, setData] = useState<DecodedToken | undefined>(undefined)

  // run everytime pathtime changes 
  // get user data and set the new user data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/users/me')
        const userData = await response.data.data
        setData(userData)
      }
      catch (error: any){
        console.log(error.message)
        setData(undefined)
      }
    }
    getData()
  }, [pathname])

  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      setData(undefined)
      toast.success('Logout Successful')
      router.push('/login')
      // router.refresh()
    }
    catch (error: any){
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const handleButtonClick =  async () => {
    if (data) {
      logout()
    }
    else {
      router.replace('/signup')
      // router.refresh()
    }
  }

  return (
    <div  className="flex flex-col items-center justify-center">
      <Toaster />
      <Navbar position="static" isBordered className='flex flex-row items-center justify-center'>

        <NavbarContent>
          bobfungus
        </NavbarContent>
        
        <div className="flex flex-row">
          <NavbarContent className="mr-3">
            {/* <Button 
              color='danger'
              variant="shadow"
          
              onClick={() => router.push('/signup')}
            >Signup</Button>

            <Button
              color='danger'
              variant="shadow"
              onClick={logout}
            >
            Logout</Button> */}

            <Button
              color='danger'
              variant="shadow"
              onClick={handleButtonClick}
            >
              {data ? "Logout" : "Signup"}
            </Button>

            <button className="bg-blue-300" onClick={() => console.log(data)}>console log</button>
          </NavbarContent>

          <NavbarContent className="m-auto">
            <ThemeSwitcher />
          </NavbarContent>
        </div>
      </Navbar>
    </div>
  )
}