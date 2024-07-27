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
import { useRouter } from "next/navigation" 

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter()
  const [data, setData] = useState<DecodedToken | undefined>(undefined)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/users/me')
      setData(response.data.data)
    }

    getData()
  }, [])

  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      setData(undefined)
      toast.success('Logout Successful')
      
      router.push('/login')
      router.refresh()
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
      // await router.refresh()
      // router.push('/signup')
      // router.prefetch('/signup')
      router.replace('/signup')
      router.refresh()
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
          </NavbarContent>

          <NavbarContent className="m-auto">
            <ThemeSwitcher />
          </NavbarContent>
        </div>
      </Navbar>
    </div>
  )
}